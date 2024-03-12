import { createTRPCClient, httpBatchLink, splitLink } from "@trpc/client";
import { AppRouter } from "../server";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http:localhost:8080/api/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },

      // Create custom headers

      // headers() {
      //   return {
      //     Authorization: "Bearer token1234",
      //   };
      // },
    }),
  ],
});

export * from "./client";
export * from "./trpc-provider";
