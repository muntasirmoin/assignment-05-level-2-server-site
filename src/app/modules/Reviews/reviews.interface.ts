import { ObjectId } from "mongodb"; // Adjust import as needed

export interface IRatingAndFeedback {
  rating: number;
  feedback: string;
  userId?: ObjectId;
  userName?: string;
}
