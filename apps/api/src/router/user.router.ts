import { Router } from "express";
import {
  getAllUsers,
  login,
  logout,
  register,
} from "../controller/user.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const routes = Router();

// Un-protected routes!
routes.route("/").get(getAllUsers);
routes.route("/register").post(register);
routes.route("/login").post(login);

// Protected routes!
routes.route("/logout").post(auth, logout);

export default routes;
