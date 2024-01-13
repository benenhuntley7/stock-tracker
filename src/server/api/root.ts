import { createTRPCRouter } from "~/server/api/trpc";

import { postsRouter } from "~/server/api/routers/posts";
import { stocksRouter } from "./routers/stocks";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  stocks: stocksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
