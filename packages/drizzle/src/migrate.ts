import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationConnection = postgres(process.env.DATABASE_URL!, { max: 1 });

(async () => {
  try {
    await migrate(drizzle(migrationConnection), {
      migrationsFolder: "src/migrations",
    });
    console.log("Migration Successfull 🎉");
    await migrationConnection.end();
  } catch (error) {
    await migrationConnection.end();
    console.error(error);
    process.exit(1);
  }
})();


