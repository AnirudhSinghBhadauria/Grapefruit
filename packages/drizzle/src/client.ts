import postgres from "postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as mainSchema from "./schema/main";

const postgresConnection = postgres(
  "postgres://chat_ebau_user:pi40o5ky67pxtsBw1MQ8aftpfKUxE59h@dpg-cngudcn79t8c73ah5e6g-a.singapore-postgres.render.com/chat_ebau?ssl=true"
);

export const db: PostgresJsDatabase<typeof mainSchema> = drizzle(
  postgresConnection,
  {
    schema: mainSchema,
  }
);
