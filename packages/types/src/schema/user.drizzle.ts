import { InferInsertModel, InferSelectModel, userRelation } from "@chat/drizzle";


export type User = InferSelectModel<typeof userRelation>;
export type newUser = InferInsertModel<typeof userRelation>;