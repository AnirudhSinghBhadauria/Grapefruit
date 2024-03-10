import { inferRouterOutputs } from "@trpc/server";
import { router } from "../trpc";
import { userRoute } from "./user";

// Merge all the routers here!
export const appRouter = router({
  Users: userRoute,
});

export type AppRouter = typeof appRouter;
export type AppRouterType = inferRouterOutputs<AppRouter>