import { Router, Request, Response } from "express";
import {
  uploadMeme,
  getAllMemes,
  getMemeById,
  voteForMeme,
  getMemeBattle,
  updateMemeById,
  deleteMemeById,
} from "./controllers/memeController";
import { loginUser, registerUser, securityToken } from "./controllers/authController";

const router: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Welcome to the Meme Battle API
 *     responses:
 *       200:
 *         description: Server up and running.
 */
router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the Meme Battle API!");
});

// Authentication Routes
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// Meme Routes
router.post("/memes", securityToken, uploadMeme);
router.get("/memes", getAllMemes);
router.get("/memes/battle", getMemeBattle);
router.get("/memes/:id", getMemeById);
router.post("/memes/:id/vote", securityToken, voteForMeme);
router.put("/memes/:id", updateMemeById);
router.delete("/memes/:id", deleteMemeById);

export default router;
