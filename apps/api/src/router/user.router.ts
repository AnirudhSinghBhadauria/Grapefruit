import { Router } from "express";
import { getAllUsers } from "../controller/user.controller.js";

const routes = Router()

// Un-protected routes!
routes.route("/").get(getAllUsers);

// Protected routes!

export default routes