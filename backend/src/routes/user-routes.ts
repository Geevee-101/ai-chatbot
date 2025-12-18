import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignup,
} from "../controllers/user-controllers.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";
import {
  authenticateToken,
  authenticateUser,
} from "../middleware/auth-middleware.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator()), userSignup);
userRoutes.post("/login", validate(loginValidator()), userLogin);
userRoutes.get(
  "/auth-status",
  authenticateToken,
  authenticateUser,
  (req, res) => {
    res.status(200).json({
      message: "User logged in successfully",
      name: res.locals.user.name,
      email: res.locals.user.email,
    });
  },
);

export default userRoutes;
