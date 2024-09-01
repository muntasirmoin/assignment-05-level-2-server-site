import { Router } from "express";
import { UserRoutes } from "../modules/User/user.route";
import path from "path";
import { ServiceRoutes } from "../modules/Service/service.route";
import { slotRoutes } from "../modules/Slot/slot.route";
import { bookingRoutes } from "../modules/Booking/booking.route";
import { bookingMyRoutes } from "../modules/Booking/booking.myroute";
import { ratingAndFeedbackRoute } from "../modules/Reviews/revies.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: slotRoutes,
  },
  {
    path: "/bookings",
    route: bookingRoutes,
  },
  {
    path: "/my-bookings",
    route: bookingMyRoutes,
  },
  {
    path: "/rating-and-feedback",
    route: ratingAndFeedbackRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
