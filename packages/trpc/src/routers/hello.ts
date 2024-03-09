import { router, publicProcedure } from "../tprc";
import { db, eq, userRelation, petsRelation, User } from "@chat/drizzle";

export const helloRoute = router({
  hello: publicProcedure.query(async () => {
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

    return results;
  }),
});
