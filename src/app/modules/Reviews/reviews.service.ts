import { IRatingAndFeedback } from "./reviews.interface";
import RatingAndFeedbackModel from "./reviews.model";

const createRatingAndFeedbackIntoDB = async (payload: IRatingAndFeedback) => {
  const result = await RatingAndFeedbackModel.create(payload);

  return result;
};

const getRatingAndFeedbackFromDB = async () => {
  try {
    // Fetch all documents
    const results = await RatingAndFeedbackModel.find();
    return results;
  } catch (error) {
    console.error("Error fetching ratings and feedback:", error);
    throw new Error("Failed to fetch ratings and feedback");
  }
};

export const ratingAndFeedbackServices = {
  createRatingAndFeedbackIntoDB,
  getRatingAndFeedbackFromDB,
};
