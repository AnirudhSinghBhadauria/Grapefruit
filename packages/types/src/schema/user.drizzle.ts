import {
  InferInsertModel,
  InferSelectModel,
  userRelation,
} from "@chat/drizzle";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// User Relation
export const ExposedUserTypes = z.object({
  email: z.string(),
  username: z.string(),
  createdAt: z.string(),
  displayPicture: z.string(),
});

export const userInsertSchema = createInsertSchema(userRelation);
export const userSelectSchema = createSelectSchema(userRelation);

export type ExposedUserTypes = z.infer<typeof ExposedUserTypes>

export type User = InferSelectModel<typeof userRelation>;
export type newUser = InferInsertModel<typeof userRelation>;
