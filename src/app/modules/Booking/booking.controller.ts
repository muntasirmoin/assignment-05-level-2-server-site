import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { slotModel } from "../Slot/slot.model";
import { bookingModel } from "./booking.model";
import { bookingServices } from "./booking.service";
import httpStatus from "http-status";
import sendResponseToken from "../../utils/semResponseToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import { TBooking } from "./booking.interface";

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;

  //
  //
  // const token = req.headers.authorization;

  // if (!token) {
  //   return sendResponseToken(res, {
  //     statusCode: 401,
  //     success: false,
  //     message: "You have no access to this route",
  //   });
  // }
  // const tokenWithOutBearer = token.split(" ")[1];

  // if (!tokenWithOutBearer) {
  //   return sendResponseToken(res, {
  //     statusCode: 401,
  //     success: false,
  //     message: "You have no access to this route",
  //   });
  // }

  // // checking if the given token is valid
  // const decoded = jwt.verify(
  //   tokenWithOutBearer as string,
  //   config.jwt_access_secret as string
  // ) as JwtPayload;

  // const { role, userId, iat } = decoded;

  // const { ...payload } = req.body;
  // const payloadWithUserCustomer = { ...payload, customer: userId };

  const { ...payload } = req.body;

  const slot = await slotModel.findByIdAndUpdate(
    bookingData.slotId,
    { isBooked: "booked" },
    { new: true }
  );
  const result = await bookingServices.createBookingIntoDB(
    // payloadWithUserCustomer
    payload
  );
  const responseResult = await bookingModel
    .findById(result._id)
    .populate({
      path: "customer",
      select: "-password -role -createdAt -updatedAt", // Exclude the password field
    })
    .populate({
      path: "serviceId",
      select: "-createdAt -updatedAt",
    })
    .populate({
      path: "slotId",
      select: "-createdAt -updatedAt",
    });

  // // Exclude password and __v fields in the query result
  // const responseResult = await userModel
  //   .findOne(result._id)
  //   .select("-password -__v");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Booking successful",
    data: responseResult,
  });
});

const getAllBooking: RequestHandler = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingFromDb();

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

//
// get single service
const getSingleMyBooking = catchAsync(async (req, res) => {
  // const { id } = req.params;
  //
  const token = req.headers.authorization;
  if (!token) {
    return sendResponseToken(res, {
      statusCode: 401,
      success: false,
      message: "You have no access to this route",
    });
  }

  const tokenWithOutBearer = token.split(" ")[1];

  if (!tokenWithOutBearer) {
    return sendResponseToken(res, {
      statusCode: 401,
      success: false,
      message: "You have no access to this route",
    });
  }

  // checking if the given token is valid
  const decoded = jwt.verify(
    tokenWithOutBearer as string,
    config.jwt_access_secret as string
  ) as JwtPayload;
  const { role, userId, iat } = decoded;
  //

  const result = await bookingServices.getSingleMyBookingFromDB(userId);
  console.log(result, userId);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: "No Data Found",
      data: [],
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

//
const getAllBookingsCustomerId = async (req: Request, res: Response) => {
  try {
    // Extract customer ID from the query parameters or request body (depending on how you want to receive it)
    const customerId = req.query.customerId as string;

    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    // Call the service function to get all bookings by customer ID
    const bookings =
      await bookingServices.getAllBookingsByCustomerId(customerId);

    // Send the bookings as a response
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
//
const getUpcomingBookingsByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const bookings: TBooking[] = await bookingModel
      .find({ customer: customerId })
      .populate("slotId", "date startTime endTime")
      .exec();

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));

    const upcomingBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.slotId.date);
      return bookingDate >= startOfDay;
    });

    res.status(200).json({ success: true, data: upcomingBookings });
  } catch (error) {
    console.error("Error retrieving upcoming bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve upcoming bookings",
    });
  }
};
//
const getPastBookingsByUserIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.params;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const bookings: TBooking[] = await bookingModel
      .find({ customer: customerId })
      .populate("slotId", "date startTime endTime")
      .populate("customer")
      .populate("serviceId")
      .exec();

    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));

    const pastBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.slotId.date);
      return bookingDate < startOfDay;
    });

    res.status(200).json({ success: true, data: pastBookings });
  } catch (error) {
    console.error("Error retrieving past bookings:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve past bookings",
    });
  }
};

//

export const bookingControllers = {
  createBooking,
  getAllBooking,
  getSingleMyBooking,
  getAllBookingsCustomerId,
  getUpcomingBookingsByUserIdController,
  getPastBookingsByUserIdController,
};
