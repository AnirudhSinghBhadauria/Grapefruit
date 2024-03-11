import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../server";

export const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http:localhost:8080/trpc" })],
});

export * from "./client";
export * from "./trpc-provider";

// const users = trpc.Users.petUsers.query()
