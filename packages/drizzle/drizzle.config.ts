import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/main.ts",
  out: "src/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgres://chat_ebau_user:pi40o5ky67pxtsBw1MQ8aftpfKUxE59h@dpg-cngudcn79t8c73ah5e6g-a.singapore-postgres.render.com/chat_ebau?ssl=true",
  },
  verbose: true,
  strict: true,
});
