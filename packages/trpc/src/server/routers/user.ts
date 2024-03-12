import { router, publicProcedure } from "../trpc";
import { db, eq, asc, userRelation, petsRelation } from "@chat/drizzle";

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

  userInfo: publicProcedure.query(({ ctx }) => {
    const { email, username } = ctx;

    return {
      username,
      email,
    };
  }),

});
