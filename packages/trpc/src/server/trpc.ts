import { initTRPC } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";

export const createContext = ({ req, res }: CreateExpressContextOptions) => {
  // Check for the authorization!
  // check for jwt verify()
  // do everything that we did when we added the req.user property!
  // retrun everything that we mentioned in the context while init. TRPC!

  return {
    email: "anriudh@gmail.com",
    username: "123",
  };
};

// publicProcedure now has opts.ctx or ctx thing where we can acces all the context stuff!

type GlobalContext = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<GlobalContext>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
