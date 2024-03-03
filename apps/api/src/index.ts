import { config } from "dotenv";
import express from "express";
import { db, eq, userRelation, petsRelation } from "@chat/drizzle";
import e from "express";

const app = express();
const port = process.env.PORT || 3009;

// (async () => {
//   const res = await db.query.userRelation.findMany();
//   console.log(res);
// })();

// console.log(allUsers);

// console.log(userRelation);

app.get("/", async (req, res) => {
  // Get all Users
  const results = await db.query.userRelation.findMany({});

  // Get user orderby
  // const results = await db.query.userRelation.findMany({
  //   orderBy: [asc(userRelation.id)],
  // });

  // Get filtered users
  // const results = await db.query.userRelation.findMany({
  //   where: eq(userRelation.fullName, "anriudh singh bhadaruia"),
  // });

  // Find pets of particular user!
  // const results = await db
  //   .select({
  //     name: userRelation.fullName,
  //     phone: userRelation.phone,
  //     petName: petsRelation.name,
  //   })
  //   .from(petsRelation)
  //   .innerJoin(userRelation, eq(petsRelation.ownerId, userRelation.id))
  //   .where(eq(userRelation.id, 1));

  // const results = await db
  //   .insert(petsRelation)
  //   .values({ name: "cocker-spaniel", ownerId: 2 });

  console.log(results);
  res.status(200).json(results);
});

app.listen(port, () => console.log(`Sever running on port : ${port}`));
