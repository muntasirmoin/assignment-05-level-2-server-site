import { Document } from "mongoose";
import { TBooking } from "./booking.interface";
import { bookingModel } from "./booking.model";
import { initiatePayment } from "../payment/payment.utils";

const createBookingIntoDB = async (payload: TBooking) => {
  const result = await bookingModel.create(payload);
  //
  const populatedResult = await bookingModel
    .findById(result._id)
    .populate({
      path: "customer",
      select: "-password -role -createdAt -updatedAt", // Exclude the specified fields
    })
    .populate({
      path: "serviceId",
      select: "-createdAt -updatedAt", // Exclude the specified fields
    });

  //
  const paymentSession = await initiatePayment(populatedResult);

  console.log("paymentSession ", paymentSession);

  // return paymentSession;
  return populatedResult;
};

const getAllBookingFromDb = async () => {
  const result = bookingModel
    .find()
    .populate({
      path: "customer",
      select: "-password -role -createdAt -updatedAt", // Exclude the -password -role -createdAt -updatedAt field
    })
    .populate({
      path: "serviceId",
      select: "-createdAt -updatedAt",
    })
    .populate({
      path: "slotId",
      select: "-createdAt -updatedAt",
    });
  return result;
};

const getSingleMyBookingFromDB = async (customerId: string) => {
  const result = await bookingModel
    .find({ customer: customerId })
    .select("-customer")
    .populate({
      path: "serviceId",
      select: "-createdAt -updatedAt",
    })
    .populate({
      path: "slotId",
      select: "-createdAt -updatedAt",
    });

  return result;
};
//
const getAllBookingsByCustomerId = async (customerId: string) => {
  try {
    // Find all bookings with the specified customer ID
    const bookings = await bookingModel
      .find({ customer: customerId })
      .populate({
        path: "serviceId",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "slotId",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "customer",
        select: "-password -role -createdAt -updatedAt", // Exclude the -password -role -createdAt -updatedAt field
      });
    return bookings;
  } catch (error) {
    throw new Error("Error fetching bookings: " + error);
  }
};

//
const getUpcomingBookingsByUserId = async (customerId: string) => {
  try {
    // Find bookings by user ID and populate related fields (e.g., slotId)
    const bookings = await bookingModel
      .find({ customer: customerId })
      .populate("slotId", "date") // Populate the date field from the slot
      .exec();

    if (!bookings) {
      throw new Error("No bookings found");
    }

    // Filter upcoming bookings based on the current date
    const now = new Date();
    const upcomingBookings = bookings.filter((booking: TBooking) => {
      const bookingDate = new Date(booking.slotId.date);
      return bookingDate > now;
    });

    return upcomingBookings;
  } catch (error) {
    console.error("Error fetching upcoming bookings:", error);
    throw error;
  }
};
//

const getPastBookingsByUserId = async (customerId: string) => {
  try {
    // Find bookings by user ID and populate related fields (e.g., slotId)
    const bookings = await bookingModel
      .find({ customer: customerId })
      .populate({
        path: "serviceId",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "slotId",
        select: "-createdAt -updatedAt",
      })
      .populate({
        path: "customer",
        select: "-password -role -createdAt -updatedAt", // Exclude the -password -role -createdAt -updatedAt field
      });

    if (!bookings) {
      throw new Error("No bookings found");
    }

    // Filter upcoming bookings based on the current date
    const now = new Date();
    const pastBookings = bookings.filter((booking: TBooking) => {
      const bookingDate = new Date(booking.slotId.date);
      return bookingDate > now;
    });

    return pastBookings;
  } catch (error) {
    console.error("Error fetching past bookings:", error);
    throw error;
  }
};
//
export const bookingServices = {
  createBookingIntoDB,
  getAllBookingFromDb,
  getSingleMyBookingFromDB,
  getAllBookingsByCustomerId,
  getUpcomingBookingsByUserId,
  getPastBookingsByUserId,
};
