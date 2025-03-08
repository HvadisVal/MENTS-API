import { User } from "./user";

export interface Meme extends Document {
    title: string;
    imageUrl: string;
    description?: string;
    creator: User["id"];
    votes: number;
    votedUsers: string[]; // ✅ Add votedUsers array
    createdAt: Date;
}
