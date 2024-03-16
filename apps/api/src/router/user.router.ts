import { Router } from "express";
import { getAllUsers, login, register } from "../controller/user.controller.js";

const routes = Router();

// Un-protected routes!
routes.route("/").get(getAllUsers);
routes.route("/register").post(register);
routes.route("/login").post(login);

// Protected routes!

export default routes;
