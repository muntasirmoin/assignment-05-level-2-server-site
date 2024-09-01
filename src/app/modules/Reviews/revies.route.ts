import { Router } from "express";
import { ratingAndFeedbackController } from "./reviews.controller";

const router = Router();

// Route to create a new rating and feedback
router.post("/", ratingAndFeedbackController.createRatingAndFeedback);

// Route to get all ratings and feedback
router.get("/", ratingAndFeedbackController.getRatingAndFeedback);

export const ratingAndFeedbackRoute = router;

// export const bookingRoutes = router;
