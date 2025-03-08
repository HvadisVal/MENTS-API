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

/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User registered successfully.
 */
router.post("/user/register", registerUser);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User
 *     summary: User login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 */
router.post("/user/login", loginUser);

/**
 * @swagger
 * /memes:
 *   post:
 *     tags:
 *       - Meme
 *     summary: Upload a new meme
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Meme"
 *     responses:
 *       201:
 *         description: Meme uploaded successfully.
 */
router.post("/memes", securityToken, uploadMeme);

/**
 * @swagger
 * /memes:
 *   get:
 *     tags:
 *       - Meme
 *     summary: Get all memes
 *     responses:
 *       200:
 *         description: List of all memes.
 */
router.get("/memes", getAllMemes);

/**
 * @swagger
 * /memes/battle:
 *   get:
 *     tags:
 *       - Meme
 *     summary: Get two random memes for battle
 *     responses:
 *       200:
 *         description: Two random memes returned.
 */
router.get("/memes/battle", getMemeBattle);

/**
 * @swagger
 * /memes/{id}:
 *   get:
 *     tags:
 *       - Meme
 *     summary: Get meme by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meme ID
 *     responses:
 *       200:
 *         description: Meme details retrieved successfully.
 */
router.get("/memes/:id", getMemeById);

/**
 * @swagger
 * /memes/{id}/vote:
 *   post:
 *     tags:
 *       - Meme
 *     summary: Vote for a meme
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meme ID
 *     responses:
 *       200:
 *         description: Meme voted successfully.
 */
router.post("/memes/:id/vote", securityToken, voteForMeme);

/**
 * @swagger
 * /memes/{id}:
 *   put:
 *     tags:
 *       - Meme
 *     summary: Update meme by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meme ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Meme"
 *     responses:
 *       200:
 *         description: Meme updated successfully.
 */
router.put("/memes/:id", updateMemeById);

/**
 * @swagger
 * /memes/{id}:
 *   delete:
 *     tags:
 *       - Meme
 *     summary: Delete meme by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Meme ID
 *     responses:
 *       200:
 *         description: Meme deleted successfully.
 */
router.delete("/memes/:id", deleteMemeById);

export default router;
