import config from "../../config";
import { TLoginUser, TUser } from "./user.interface";
import { userModel } from "./user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { createToken } from "./user.utils";

const createAdminIntoDB = async (payload: TUser) => {
  // hashing password here
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  // Replace the plain password with the hashed password
  const payloadWithHashedPassword = { ...payload, password: hashedPassword };

  const result = await userModel.create(payloadWithHashedPassword);

  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await userModel.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const passwordMatch = await bcrypt.compare(payload.password, user.password);

  if (!passwordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password");
  }

  // create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  };

  // Create access token with "Bearer" prefix
  // const accessToken = `Bearer ${createToken(
  //   jwtPayload,
  //   config.jwt_access_secret as string,
  //   config.jwt_access_expires_in as string
  // )}`;

  // Create refresh token with "Bearer" prefix
  // const refreshToken = `Bearer ${createToken(
  //   jwtPayload,
  //   config.jwt_refresh_secret as string,
  //   config.jwt_refresh_expires_in as string
  // )}`;

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,

    user,
    refreshToken,
  };
};

//
export const getAllUsers = async () => {
  try {
    const users = await userModel
      .find()
      .select("-password  -createdAt -updatedAt");
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

//
const changeUserRole = async (
  slotId: string,
  currentRole: "user" | "admin"
) => {
  try {
    // Determine the new status based on the current status
    // const newStatus = currentRole === "user" ? "admin" : "user";
    console.log("user1", currentRole, slotId);
    // Update the slot status in the database
    const updatedRole = await userModel.findByIdAndUpdate(
      slotId,
      { role: currentRole },
      { new: true } // Return the updated document
    );

    // Check if the slot was found and updated
    if (!updatedRole) {
      throw new Error("User not found");
    }

    return updatedRole;
  } catch (error) {
    console.error("Error updating user role status:", error);
    throw error;
  }
};

//
const findUserById = async (userId: string) => {
  try {
    // Find the user by ID
    console.log(userId);
    const user = await userModel.findById(userId).select("-password").exec();

    // Check if user exists
    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};

//
const updateUserById = async (userId: string, updateData: Partial<TUser>) => {
  console.log("Service id", userId, "updateData", updateData);

  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update
    });

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

//

export const UserServices = {
  createAdminIntoDB,
  loginUser,
  getAllUsers,
  changeUserRole,
  findUserById,
  updateUserById,
};
