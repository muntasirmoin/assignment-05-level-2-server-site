import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validate";

const router = express.Router();
// Route: /api/auth/signup (POST)
router.post(
  "/signup",
  validateRequest(userValidation.userValidationSchema),
  UserControllers.createUser
);

// Route: /api/auth/login(POST)
router.post(
  "/login",
  validateRequest(userValidation.loginValidationSchema),
  UserControllers.loginUser
);

router.get("/users", UserControllers.getAllUsersController);

router.post("/role", UserControllers.changeUserRoleController);
router.get("/singleuser", UserControllers.getUserByIdController);
router.put("/user/:userId", UserControllers.updateUserController);

export const UserRoutes = router;
