import { Schema, model } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String, // Image URL should be a string
      required: false, // Optional, as some services may not have an image
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// isDeleted false value allGet theke bad jabe
serviceSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const serviceModel = model<TService>("Services", serviceSchema);
