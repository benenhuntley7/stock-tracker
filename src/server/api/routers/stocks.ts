import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const stocksRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    if (!userId) {
      // Handle the case when the user is not authenticated
      throw new Error("User not authenticated");
    }

    const stocks = await ctx.db.stock.findMany({ where: { userId: userId } });

    return stocks;
  }),
});
