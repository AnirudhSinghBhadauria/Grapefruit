import { config } from "dotenv";
import express from "express";
import { db, userRelation, asc, petsRelation, eq } from "@chat/drizzle";
import { trpcExpress } from "@chat/trpc-server";

const app = express();
const port = process.env.PORT || 3009;

// trpc injector
app.use("/trpc", trpcExpress);

app.get("/", async (req, res) => {
  // Get all Users
  // const results = await db.query.userRelation.findMany();

  // Get user orderby
  // const results = await db.query.userRelation.findMany({
  //   orderBy: [asc(userRelation.id)],
  // });

  // Get filtered users
  // const results = await db.query.userRelation.findMany({
  //   where: eq(userRelation.fullName, "anriudh singh bhadaruia"),
  // });

  // Find pets of particular user!
  const results = await db
    .select({
      fullName: userRelation.firstName,
      lastName: userRelation.lastName,
      phone: userRelation.phone,
      petName: petsRelation.name,
    })
    .from(petsRelation)
    .innerJoin(userRelation, eq(petsRelation.ownerId, userRelation.id))
    .where(eq(userRelation.id, 1));

  // const results = await db
  //   .insert(petsRelation)
  //   .values({ name: "cocker-spaniel", ownerId: 2 });

  res.status(200).json(results);
});

app.listen(port, () => console.log(`Sever running on port : ${port}`));
