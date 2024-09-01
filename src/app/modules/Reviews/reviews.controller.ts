import { Request, Response, NextFunction } from "express";
import { IRatingAndFeedback } from "./reviews.interface";
import { ratingAndFeedbackServices } from "./reviews.service"; // Adjust the import path to your service file

// Controller function to create a new rating and feedback
const createRatingAndFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: IRatingAndFeedback = req.body;

    // Validate the payload if necessary
    if (!payload.rating || !payload.feedback || !payload.userId) {
      return res
        .status(400)
        .json({ message: "Rating, feedback, and userId are required." });
    }

    const result =
      await ratingAndFeedbackServices.createRatingAndFeedbackIntoDB(payload);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating rating and feedback:", error);
    next(error); // Pass the error to the global error handler
  }
};

// Controller function to get all rating and feedback
const getRatingAndFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const results =
      await ratingAndFeedbackServices.getRatingAndFeedbackFromDB();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching rating and feedback:", error);
    next(error); // Pass the error to the global error handler
  }
};

// Export controller functions
export const ratingAndFeedbackController = {
  createRatingAndFeedback,
  getRatingAndFeedback,
};
