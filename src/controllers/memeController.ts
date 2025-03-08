import { AuthRequest } from "../controllers/authController"; // Import extended request type
import { Request, Response } from "express";
import { memeModel } from "../models/memeModel";
import { connect, disconnect } from "../repository/database";

// Upload a new meme
export async function uploadMeme(req: AuthRequest, res: Response): Promise<void> {
    try {
        await connect();

        if (!req.user) { 
            res.status(401).json({ error: "Unauthorized: No user data found in token." });
            return;
        }

        const { title, imageUrl, description } = req.body;
        const creator = req.user.id; // ✅ Automatically assign creator ID

        const newMeme = new memeModel({
            title,
            imageUrl,
            description,
            creator,
        });

        await newMeme.save();
        res.status(201).json({ message: "Meme uploaded successfully!", meme: newMeme });

    } catch (error) {
        res.status(500).json({ error: "Error uploading meme", details: error });
    } finally {
        await disconnect();
    }
}

// Get all memes
export async function getAllMemes(req: Request, res: Response): Promise<void> {
    try {
        await connect();
        const memes = await memeModel.find({});
        res.status(200).json(memes);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving memes", details: error });
    } finally {
        await disconnect();
    }
}

// Get meme by ID
import mongoose from "mongoose";

export async function getMemeById(req: Request, res: Response): Promise<void> {
    try {
        await connect();

        // Validate if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: "Invalid meme ID format" });
            return;
        }

        const meme = await memeModel.findById(req.params.id);
        if (!meme) {
            res.status(404).json({ error: "Meme not found" });
            return;
        }

        res.status(200).json(meme);
    } catch (error) {
        res.status(500).json({ error: "Error fetching meme by ID", details: error });
    } finally {
        await disconnect();
    }
}


export async function voteForMeme(req: AuthRequest, res: Response): Promise<void> {
    try {
        await connect();

        if (!req.user) {
            res.status(401).json({ error: "Unauthorized: No user data found in token." });
            return;
        }

        const { id } = req.params;
        const userId = req.user.id;

        const meme = await memeModel.findById(id);
        if (!meme) {
            res.status(404).json({ error: "Meme not found" });
            return;
        }

        // Optional: Prevent multiple votes per user
        if (meme.votedUsers?.includes(userId)) {
            res.status(400).json({ error: "You have already voted for this meme." });
            return;
        }

        // Update meme votes
        meme.votes += 1;
        meme.votedUsers = meme.votedUsers || [];
        meme.votedUsers.push(userId);

        await meme.save();

        res.status(200).json({ message: "Vote counted!", meme });

    } catch (error) {
        res.status(500).json({ error: "Error voting for meme", details: error });
    } finally {
        await disconnect();
    }
}


/**
 * Get 2 random memes for a battle
 */
export async function getMemeBattle(req: Request, res: Response): Promise<void> {
    try {
        await connect();

        // Count total memes in the database
        const memeCount = await memeModel.countDocuments();
        if (memeCount < 2) {
            res.status(400).json({ error: "Not enough memes for a battle" });
            return;
        }

        // Get 2 random memes
        const randomMemes = await memeModel.aggregate([{ $sample: { size: 2 } }]);

        res.status(200).json(randomMemes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching meme battle", details: error });
    } finally {
        await disconnect();
    }
}

export async function updateMemeById(req: Request, res: Response): Promise<void> {
    try {
        await connect();

        const memeId = req.params.id;

        // Validate if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(memeId)) {
            res.status(400).json({ error: "Invalid meme ID format" });
            return;
        }

        const updatedMeme = await memeModel.findByIdAndUpdate(memeId, req.body, { new: true });

        if (!updatedMeme) {
            res.status(404).json({ error: "Meme not found" });
            return;
        }

        res.status(200).json({ message: "Meme updated successfully!", updatedMeme });
    } catch (error) {
        res.status(500).json({ error: "Error updating meme", details: error });
    } finally {
        await disconnect();
    }
}

export async function deleteMemeById(req: Request, res: Response): Promise<void> {
    try {
        await connect();

        const memeId = req.params.id;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(memeId)) {
            res.status(400).json({ error: "Invalid meme ID format" });
            return;
        }

        const deletedMeme = await memeModel.findByIdAndDelete(memeId);

        if (!deletedMeme) {
            res.status(404).json({ error: "Meme not found" });
            return;
        }

        res.status(200).json({ message: "Meme deleted successfully!", deletedMeme });
    } catch (error) {
        res.status(500).json({ error: "Error deleting meme", details: error });
    } finally {
        await disconnect();
    }
}

