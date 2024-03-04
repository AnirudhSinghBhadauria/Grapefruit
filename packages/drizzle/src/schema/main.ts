import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const userRelation = pgTable("users", {
  id: integer("id").primaryKey().unique(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  phone: varchar("phone", { length: 256 }),
});

export const petsRelation = pgTable("pets", {
  id: integer("id").primaryKey().unique(),
  name: text("name").notNull(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => userRelation.id),
});
