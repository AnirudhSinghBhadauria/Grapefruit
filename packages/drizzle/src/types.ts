import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { userRelation } from "./schema/main";

export type User = InferSelectModel<typeof userRelation>;
export type newUser = InferInsertModel<typeof userRelation>;
