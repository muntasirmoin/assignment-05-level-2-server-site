import express from "express";
import { bookingControllers } from "./booking.controller";
import { USER_ROLE } from "../User/user.interface";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(USER_ROLE.user), bookingControllers.getSingleMyBooking);

export const bookingMyRoutes = router;
