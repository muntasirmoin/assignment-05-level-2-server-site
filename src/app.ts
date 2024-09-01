/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/router";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFoundRoute from "./app/middlewares/notFoundRoute";

const app: Application = express();
// const port = 3000

// parser
app.use(express.json());
app.use(cookieParser());
// check
// app.use(cors({ origin: ["http://localhost:5174"] })); //check
app.use(cors({ origin: ["http://localhost:5174"], credentials: true }));
// app.use(cors());

// application route

app.use("/api", router);

// const test = async (req: Request, res: Response) => {
//   Promise.reject();
// };
// app.get("/", test);
app.get("/", (req: Request, res: Response) => {
  res.send("Wheels Wash Booking System!");
});

// Error Handling:
app.use(globalErrorHandler);
// Not Found Route:
app.use(notFoundRoute);

export default app;
