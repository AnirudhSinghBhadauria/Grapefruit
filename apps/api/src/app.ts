import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser());

// Routes
import userRouter from "./router/user.router.js";

app.use("/api/users", userRouter);

export { app };
