import { createTRPCRouter } from "~/server/api/trpc";

import { postsRouter } from "~/server/api/routers/posts";
import { yahooFinanceRouter } from "./routers/yahooFinance";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  yahooFinance: yahooFinanceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
