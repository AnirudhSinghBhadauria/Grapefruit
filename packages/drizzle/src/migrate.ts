import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationConnection = postgres(
  "postgres://chat_ebau_user:pi40o5ky67pxtsBw1MQ8aftpfKUxE59h@dpg-cngudcn79t8c73ah5e6g-a.singapore-postgres.render.com/chat_ebau?ssl=true",
  { max: 1 }
);

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
