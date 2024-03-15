import { Router } from "express";
import { getAllUsers, register } from "../controller/user.controller.js";

const routes = Router();

// Un-protected routes!
routes.route("/").get(getAllUsers);
routes.route("/register").post(register);

// Protected routes!

export default routes;
