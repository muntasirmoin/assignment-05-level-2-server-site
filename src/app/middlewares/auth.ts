import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import config from "../config";
import { TUserRole } from "../modules/User/user.interface";
import { userModel } from "../modules/User/user.model";
import sendResponseToken from "../utils/semResponseToken";

// middleware Authorization check
export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // is the token is sent from client
    if (!token) {
      return sendResponseToken(res, {
        statusCode: 401,
        success: false,
        message: "You have no access to this route",
      });
    }

    const tokenWithOutBearer = token.split(" ")[1];

    if (!tokenWithOutBearer) {
      return sendResponseToken(res, {
        statusCode: 401,
        success: false,
        message: "You have no access to this route",
      });
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      tokenWithOutBearer as string,
      config.jwt_access_secret as string
    ) as JwtPayload;

    // checking  is user exist
    const { role, userId, iat } = decoded;
    const user = await userModel.isUserExistsByCustomId(userId);

    if (!user) {
      return sendResponseToken(res, {
        statusCode: 401,
        success: false,
        message: "You have no access to this route",
      });
    }

    // checking is user / admin !
    if (requiredRoles && !requiredRoles.includes(role)) {
      return sendResponseToken(res, {
        statusCode: 401,
        success: false,
        message: "You have no access to this route",
      });
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
