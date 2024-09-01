import express from "express";
import { bookingControllers } from "./booking.controller";
import { USER_ROLE } from "../User/user.interface";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validate";
const router = express.Router();

// Route: /api/bookings(POST)

// router.post("/", auth(USER_ROLE.user), bookingControllers.createBooking);
router.post(
  "/",
  // auth(USER_ROLE.user),
  // validateRequest(bookingValidation.bookingValidationSchema),
  bookingControllers.createBooking
);

// Route: /api/bookings(GET)

router.get(
  "/",
  // auth(USER_ROLE.admin),
  bookingControllers.getAllBooking
);

router.get("/BookingsCustomerId", bookingControllers.getAllBookingsCustomerId);
router.get(
  "/upcoming/:customerId",
  bookingControllers.getUpcomingBookingsByUserIdController
);
router.get(
  "/past/:customerId",
  bookingControllers.getPastBookingsByUserIdController
);
export const bookingRoutes = router;
