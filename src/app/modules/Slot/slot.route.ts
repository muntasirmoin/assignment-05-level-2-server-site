import express from "express";
import { slotController } from "./slot.controller";

const router = express.Router();

// /api/services/slots(POST)

// 9. Get available slots
// Route: /api/slots/availability(GET)
// router.patch("/slots/:slotId/book", slotController.markSlotAsBookedController);

router.post("/create", slotController.createSlot);
router.post(
  "/availableCanceled",
  slotController.updateSlotAvailableCanceledController
);
router.get("/availability", slotController.getAllSlots);
router.get("/allSlot", slotController.getAllSlotDataFromDbController);
router.get("/:slotId", slotController.getSlotByIdController);
router.post("/:slotId/book", slotController.markSlotAsBookedController);

export const slotRoutes = router;
