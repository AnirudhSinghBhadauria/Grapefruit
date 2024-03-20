import postgres from "postgres";
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as mainSchema from "./schema/main";

const postgresConnection = postgres(process.env.DATABASE_URL!);

export const db: PostgresJsDatabase<typeof mainSchema> = drizzle(
  postgresConnection,
  {
    schema: mainSchema,
  },
);
