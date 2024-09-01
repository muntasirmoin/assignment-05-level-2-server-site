import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

import { slotServices } from "./slot.service";
import httpStatus from "http-status";
import { slotModel } from "./slot.model";

interface SlotRequestParams {
  slotId: string;
}

const createSlot = catchAsync(async (req, res) => {
  const slotData = req.body;

  const result = await slotServices.createSlotIntoDB(slotData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Slot created successfully",
    // data: responseResult,
    data: result,
  });
});

const getAllSlots: RequestHandler = catchAsync(async (req, res) => {
  const result = await slotServices.getAllSlotFromDb(req.query);

  if (!result || result.length === 0) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
      //     "success": false,
      // "statusCode": 404,
      // "message": "No Data Found",
      // "data":[]
    });
  }
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});
//
const getSlotByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { slotId } = req.params;
  try {
    const slot = await slotServices.getSlotById(slotId);
    res.status(200).json(slot);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
//
const markSlotAsBookedController = async (req: Request, res: Response) => {
  try {
    const { slotId } = req.params;

    if (!slotId) {
      return res.status(400).json({ message: "Slot ID is required" });
    }

    const updatedSlot = await slotServices.markSlotAsBooked(slotId);

    return res.status(200).json({
      message: "Slot marked as booked successfully",
      data: updatedSlot,
    });
  } catch (error) {
    console.error("Error in marking slot as booked:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//

const getAllSlotDataFromDbController = async (req: Request, res: Response) => {
  try {
    // Fetch all slots and populate the 'service' field
    const slots = await slotServices.getAllSlotDataFromDb();

    // Send the response with the fetched slots
    res.status(200).json({
      success: true,
      data: slots,
    });
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch slots.",
    });
  }
};
//
const updateSlotAvailableCanceledController = async (
  req: Request,
  res: Response
) => {
  try {
    // Extract slotId and currentStatus from request parameters or body
    // const { slotId } = req.params;
    const { currentStatus, slotId } = req.body;

    // Validate input
    if (
      !slotId ||
      !["available", "booked", "canceled"].includes(currentStatus)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    // Call the service function to update the slot status
    const updatedSlot = await slotServices.markSlotAsAvailableCanceled(
      slotId,
      currentStatus
    );

    // Send success response with the updated slot data
    res.status(200).json({
      success: true,
      data: updatedSlot,
    });
  } catch (error) {
    console.error("Error updating slot status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update slot status.",
    });
  }
};

//
// /
export const slotController = {
  createSlot,
  getAllSlots,
  getSlotByIdController,
  markSlotAsBookedController,
  getAllSlotDataFromDbController,
  updateSlotAvailableCanceledController,
};
