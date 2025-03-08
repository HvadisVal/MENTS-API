import { Schema, model } from "mongoose";
import { Meme } from "../interfaces/meme";

const memeSchema = new Schema<Meme>({
    title: { type: String, required: true, min: 3, max: 255 },
    imageUrl: { type: String, required: true },
    description: { type: String, max: 500 },
    creator: { type: String, ref: "User", required: true },
    votes: { type: Number, default: 0 },
    votedUsers: [{ type: String, ref: "User" }], // ✅ Track users who voted
    createdAt: { type: Date, default: Date.now }
});

export const memeModel = model<Meme>("Meme", memeSchema);



/* 
{
    "name": "Product #1",
    "description": "Product 1 description",
    "imageUrl": "https://picsum.photos/200",
    "price": 10.99,
    "stock": 100,
    "discount": true,
    "discountPct": 10,
    "isHidden": false,
    "_createdBy": "60f3b3b3b3b3b3b3b3b3b3b3"
}

*/