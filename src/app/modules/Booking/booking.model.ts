import mongoose, { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Services",
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slots",
      required: true,
    },
    vehicleType: {
      type: String,
      enum: [
        "car",
        "truck",
        "SUV",
        "van",
        "motorcycle",
        "bus",
        "electricVehicle",
        "hybridVehicle",
        "bicycle",
        "tractor",
      ],
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const bookingModel = model<TBooking>("Bookings", bookingSchema);
