// In this file we will combine all the routes into a single router and expose them!

import { inferRouterOutputs } from "@trpc/server";
import { router } from "../tprc";
import { userRoute } from "./user";

export const appRouter = router({
  Users: userRoute,
});

export type AppRouter = typeof appRouter;
export type AppRouterType = inferRouterOutputs<AppRouter>
