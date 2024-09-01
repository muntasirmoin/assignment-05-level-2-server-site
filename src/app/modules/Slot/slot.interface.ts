import { ObjectId } from "mongoose";

export interface TSlot {
  service: ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: "available" | "booked" | "canceled";
}

// service, date, startTime, endTime, isBooked
