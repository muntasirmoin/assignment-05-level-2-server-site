import mongoose, { Schema, Document } from "mongoose";
import { IRatingAndFeedback } from "./reviews.interface";

const RatingAndFeedbackSchema: Schema = new Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedback: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User", // Reference to a User model if applicable
      required: false,
    },
  },
  { timestamps: true }
); // Include timestamps for createdAt and updatedAt

// Create and export the model
const RatingAndFeedbackModel = mongoose.model<IRatingAndFeedback>(
  "RatingAndFeedback",
  RatingAndFeedbackSchema
);

export default RatingAndFeedbackModel;
