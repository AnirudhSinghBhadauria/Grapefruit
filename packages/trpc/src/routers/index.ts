// In this file we will combine all the routes into a single router and expose them!

import { inferRouterOutputs } from "@trpc/server";
import { router } from "../tprc";
import { helloRoute } from "./hello";

export const appRouter = router({
     hello: helloRoute
})

export type AppRouterType = inferRouterOutputs<typeof appRouter>