import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

// router.get("/confirmation", paymentController.confirmationController);
router.post("/confirmation", paymentController.confirmationController);

export const paymentRoutes = router;
