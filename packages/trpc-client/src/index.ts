import { AppRouter } from "@chat/trpc-server";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const trpc = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http:localhost:8080/trpc" })],
});

// const name = trpc.Users.petUsers.query();
