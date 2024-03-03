import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userRelation = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export const petsRelation = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  ownerId: integer("owner_id")
    .notNull()
    .references(() => userRelation.id),
});
