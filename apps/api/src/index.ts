import { config } from "dotenv";

import { trpcExpress } from "@chat/trpc/server";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3009;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/trpc", trpcExpress);

app.get("/", async (req, res) => {
  res.status(200).json({ status: `Sever running on port : ${port}` });
});

app.listen(port, () => console.log(`Sever running on port : ${port}`));

