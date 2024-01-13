import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const stocksRouter = createTRPCRouter({
  getAll: privateProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const stocks = await ctx.db.stock.findMany({ where: { userId: userId } });
    // You can add more logic to transform or filter stocks as needed

    return { stocks };
  }),
});
