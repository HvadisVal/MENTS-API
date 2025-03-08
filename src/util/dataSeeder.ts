import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel";
import { memeModel } from "../models/memeModel";

dotenv.config();  // Load environment variables

const mongoURI = process.env.DBHOST;  // Ensure this matches .env key exactly

if (!mongoURI) {
  console.error(" MONGO_URI is undefined. Check your .env file.");
  process.exit(1);  // Stop execution if no DB URI
}

const seedDatabase = async () => {
  try {
    console.log(" Connecting to MongoDB...");
    await mongoose.connect(mongoURI);
    console.log(" Connected to MongoDB Atlas!");

    // Clear existing data
    await UserModel.deleteMany({});
    await memeModel.deleteMany({});
    console.log(" Existing data cleared.");

    // Hash passwords
    const hashedPasswords = await Promise.all([
      bcrypt.hash("password123", 10),
      bcrypt.hash("testpassword", 10),
    ]);

    // Seed Users
    const users = await UserModel.insertMany([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPasswords[0],
      },
      {
        name: "Test User",
        email: "test@example.com",
        password: hashedPasswords[1],
      },
    ]);
    console.log(" Users seeded.");

    // Seed Memes
    await memeModel.insertMany([
      {
        title: "First Meme",
        imageUrl: "https://example.com/meme1.jpg",
        description: "This is the first meme!",
        creator: users[0]._id,
        votes: 10,
      },
      {
        title: "Second Meme",
        imageUrl: "https://example.com/meme2.jpg",
        description: "Another great meme!",
        creator: users[1]._id,
        votes: 5,
      },
    ]);
    console.log(" Memes seeded.");

    mongoose.connection.close();
    console.log(" Database seeding complete and connection closed.");
  } catch (error) {
    console.error(" Error seeding database:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

// Run Seeder
seedDatabase();
