import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { weightHistoryRouter } from "./routers/weightHistory";
import { mateRouter } from "./routers/mate";
import { recipesRouter } from "./routers/recipes";
import { blackListRouter } from "./routers/blackList";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  weightHistory: weightHistoryRouter,
  mate: mateRouter,
  recipes: recipesRouter,
  blacklist: blackListRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
