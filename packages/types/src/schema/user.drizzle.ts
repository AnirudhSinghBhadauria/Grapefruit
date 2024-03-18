import {
  InferInsertModel,
  InferSelectModel,
  userRelation,
} from "@chat/drizzle";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// User Relation
export const ExposedUserTypes = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  displayPicture: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const LoginRegisterInputs = z.object({
  username: z
    .string()
    .trim()
    .min(4, { message: "Username must be atleast 4 chars long!" })
    .max(20, { message: "Usernmae cannot be more than 20 chars!" }),
  password: z
    .string()
    .trim()
    .min(8, { message: "password should be of atleast 8 chars!" })
    .max(50, { message: "password cannot be more that 35 chars!" }),
});

export const UserInfoTypes = z.object({
  id: z.string(),
  username: z.string().nullable(),
});

export const userInsertSchema = createInsertSchema(userRelation);
export const userSelectSchema = createSelectSchema(userRelation);

export type ExposedUserTypes = z.infer<typeof ExposedUserTypes>;
export type UserInfoTypes = z.infer<typeof UserInfoTypes>;

export type User = InferSelectModel<typeof userRelation>;
export type newUser = InferInsertModel<typeof userRelation>;

