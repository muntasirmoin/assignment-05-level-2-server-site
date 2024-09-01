import { Model } from "mongoose";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserExistsModel extends Model<TUser> {
  //instance methods for checking is the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
}
export const USER_ROLE = {
  user: "user",
  admin: "admin",
} as const;

export type TUserRole = keyof typeof USER_ROLE;
