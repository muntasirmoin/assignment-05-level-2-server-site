import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { userModel } from "./user.model";
import sendResponseToken from "../../utils/semResponseToken";
import config from "../../config";
import { Request, Response } from "express";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const result = await UserServices.createAdminIntoDB(userData);

  // Exclude password and __v fields in the query result
  const responseResult = await userModel
    .findOne(result._id)
    .select("-password -__v");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User registered successfully",
    data: responseResult,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await UserServices.loginUser(req.body);
  const { refreshToken, accessToken, user } = result;
  const responseResult = await userModel
    .findOne(user._id)
    .select("-password -__v");

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  //
  const accessTokenWithoutBearer = accessToken.replace("Bearer ", "");

  //

  sendResponseToken(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    token: accessTokenWithoutBearer,
    data: responseResult,
  });
});

const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await UserServices.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user.",
    });
  }
};

//
const changeUserRoleController = async (req: Request, res: Response) => {
  try {
    // Extract slotId and currentStatus from request parameters or body
    // const { slotId } = req.params;
    const { userId, currentRole } = req.body;

    console.log("user", currentRole, userId);

    // Validate input
    if (!userId || !["user", "admin"].includes(currentRole)) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data",
      });
    }

    // Call the service function to update the slot status
    const updatedRole = await UserServices.changeUserRole(userId, currentRole);

    // Send success response with the updated slot data
    res.status(200).json({
      success: true,
      data: updatedRole,
    });
  } catch (error) {
    console.error("Error updating User role status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update user role status.",
    });
  }
};

//
const getUserByIdController = async (req: Request, res: Response) => {
  try {
    // Extract userId from request query
    const { userId } = req.query;

    console.log(userId);

    // Validate userId
    if (!userId || typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "User ID is required and must be a string",
      });
    }

    // Call the service function to find the user
    const user = await UserServices.findUserById(userId);

    // Send success response with the user data
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user by ID.",
    });
  }
};

//
const updateUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    console.log("Controller id", userId, "updateData", updateData);

    // Validate input
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Call the service function to update the user
    const updatedUser = await UserServices.updateUserById(userId, updateData);

    // Send success response with the updated user data
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

//

export const UserControllers = {
  createUser,
  loginUser,
  getAllUsersController,
  changeUserRoleController,
  getUserByIdController,
  updateUserController,
};
