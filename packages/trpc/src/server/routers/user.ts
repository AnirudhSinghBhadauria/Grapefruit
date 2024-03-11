import { router, publicProcedure } from "../trpc";
import { db, eq, userRelation, petsRelation, User } from "@chat/drizzle";

export const userRoute = router({
  petUsers: publicProcedure.query(() =>
    db
      .select({
        fullName: userRelation.firstName,
        lastName: userRelation.lastName,
        phone: userRelation.phone,
        petName: petsRelation.name,
      })
      .from(petsRelation)
      .innerJoin(userRelation, eq(petsRelation.ownerId, userRelation.id))
      .where(eq(userRelation.id, 1))
  ),
});

// export const userRoute = router({
//   petUsers: publicProcedure.query(() => {
//     return {
//       name: "anirudh singh bhadauria",
//       age: 22,
//       index: 1,
//     };
//   }),
// });