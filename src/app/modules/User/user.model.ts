import { Schema, model } from "mongoose";
import { TUser, UserExistsModel } from "./user.interface";

const UserSchema = new Schema<TUser, UserExistsModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,

    versionKey: false,
  }
);

UserSchema.statics.isUserExistsByCustomId = async function (id: string) {
  // return await userModel.findOne({ id });
  return await userModel.findById(id);
};

export const userModel = model<TUser, UserExistsModel>("User", UserSchema);
