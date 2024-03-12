import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";

// Exporting the tprc-Express adapter!

export const trpcExpress = createExpressMiddleware({
  router: appRouter,
});

// Export every route
export * from "./routers/index";
