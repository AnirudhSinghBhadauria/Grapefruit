import { appRouter } from "./routers";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

export const trpcExpress = createExpressMiddleware({
     router: appRouter
});

export * from "./routers/index";