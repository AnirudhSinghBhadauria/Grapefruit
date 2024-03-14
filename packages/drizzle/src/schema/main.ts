import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { env } from "node:process";

// Timestamps
const timestamps = {
  createdAt: timestamp("createdAt", {
    mode: "string",
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "string",
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
};

// User Relation;
export const userRelation = pgTable("user", {
  id: uuid("id").unique().primaryKey().defaultRandom(),
  email: text("email").unique().notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayPicture: text("displayPicture")
    .default(env.DEFAULT_PROFILE!)
    .notNull(),
  ...timestamps,
});

