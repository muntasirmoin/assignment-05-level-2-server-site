import { serviceModel } from "../Service/service.model";
import { calculateMinutes } from "./slot.constatnt";
import { TSlot } from "./slot.interface";
import { slotModel } from "./slot.model";

const createSlotIntoDB = async (payload: TSlot) => {
  // 2. Parse Request Body
  const { service, date, startTime, endTime, isBooked } = payload;
  const serviceData = await serviceModel.findById(service);
  //   const serviceDuration = serviceData?.duration;
  //   const serviceDuration = 60;
  const serviceDuration: number = serviceData?.duration || 60;

  //   3. Calculate the Total Duration

  const startTimeMin = calculateMinutes(startTime);
  const endTimeMin = calculateMinutes(endTime);
  const totalDuration = endTimeMin - startTimeMin;

  //    4. Generate Slot Time Intervals
  const numberOfSlots = totalDuration / serviceDuration;

  //  5
  const slots: TSlot[] = [];
  let currentStartMinutes = startTimeMin;
  for (let i = 0; i < numberOfSlots; i++) {
    const slotStartTime = `${String(Math.floor(currentStartMinutes / 60)).padStart(2, "0")}:${String(currentStartMinutes % 60).padStart(2, "0")}`;
    const slotEndTime = `${String(Math.floor((currentStartMinutes + serviceDuration) / 60)).padStart(2, "0")}:${String((currentStartMinutes + serviceDuration) % 60).padStart(2, "0")}`;

    const slot: TSlot = new slotModel({
      service: service,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: "available",
    });

    if (slotEndTime <= endTime) {
      slots.push(slot);
    }

    currentStartMinutes += serviceDuration;
  }

  return await slotModel.create(slots);
};

const getAllSlotDataFromDb = async () => {
  const availableSlots = await slotModel
    .find() // This will retrieve all documents in the slotModel collection
    .populate("service"); // This will populate the 'service' field with the corresponding service data

  return availableSlots;
};

const getAllSlotFromDb = async (query: Record<string, unknown>) => {
  const { date, serviceId } = query;

  const availableSlots = await slotModel
    .find({
      date: date,
      service: serviceId,
      isBooked: "available",
    })
    .populate("service");

  return availableSlots;
};

//
const getSlotById = async (slotId: any) => {
  try {
    const slot = await slotModel.findById(slotId);
    if (!slot) {
      throw new Error("Slot not found");
    }
    return slot;
  } catch (error) {
    throw error;
  }
};

//
const markSlotAsBooked = async (slotId: string) => {
  try {
    const updatedSlot = await slotModel.findByIdAndUpdate(
      slotId,
      { isBooked: "booked" },
      { new: true } // Return the updated document
    );

    if (!updatedSlot) {
      throw new Error("Slot not found");
    }

    return updatedSlot;
  } catch (error) {
    console.error("Error updating slot status:", error);
    throw error;
  }
};

//
const markSlotAsAvailableCanceled = async (
  slotId: string,
  currentStatus: "available" | "booked" | "canceled"
) => {
  try {
    // Determine the new status based on the current status
    const newStatus = currentStatus === "available" ? "canceled" : "available";

    // Update the slot status in the database
    const updatedSlot = await slotModel.findByIdAndUpdate(
      slotId,
      { isBooked: newStatus },
      { new: true } // Return the updated document
    );

    // Check if the slot was found and updated
    if (!updatedSlot) {
      throw new Error("Slot not found");
    }

    return updatedSlot;
  } catch (error) {
    console.error("Error updating slot status:", error);
    throw error;
  }
};

export const slotServices = {
  createSlotIntoDB,
  getAllSlotFromDb,
  getSlotById,
  markSlotAsBooked,
  getAllSlotDataFromDb,
  markSlotAsAvailableCanceled,
};
