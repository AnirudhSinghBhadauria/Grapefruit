import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const userRelation = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});
