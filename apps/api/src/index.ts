import { config } from "dotenv";
import express from "express";
import { db, userRelation, User, newUser } from "@chat/drizzle";

const app = express();
const port = process.env.PORT || 3009;

// (async () => {
//   const res = await db.query.userRelation.findMany();
//   console.log(res);
// })();

// console.log(allUsers);

console.log(userRelation);

app.get("/", async (req, res) => {
  const users = await db.query.userRelation.findMany({});

  console.log(users);
  res.status(200).json(users);
});

app.listen(port, () => console.log(`Sever running on port : ${port}`));
