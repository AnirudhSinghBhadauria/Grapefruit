import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../server";

type TRPCReact = ReturnType<typeof createTRPCReact<AppRouter>>;

export const trpc: TRPCReact = createTRPCReact<AppRouter>();
