import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./trpc";

// Exporting the tprc-Express adapter!
export const trpcExpress: any = createExpressMiddleware({
  router: appRouter,
  createContext
});

// Export every route
export * from "./routers/index";
export { createContext } from "./trpc";
