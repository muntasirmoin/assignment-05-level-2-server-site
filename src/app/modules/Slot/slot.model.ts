import mongoose, { Schema, model } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new mongoose.Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Services",
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked: {
      type: String,
      enum: ["available", "booked", "canceled"],
      default: "available",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const slotModel = model<TSlot>("Slots", slotSchema);
