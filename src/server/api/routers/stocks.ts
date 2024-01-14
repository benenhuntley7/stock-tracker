import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { getQuote } from "~/helperFunctions/yahooFinance";

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
  getQuotes: privateProcedure.input(z.array(z.string())).query(async (opts) => {
    // Ensure input is not undefined (handled by z.array(z.string()))
    const symbols = opts.input;

    // Make a call to a third-party API here
    const quotes = await getQuote(symbols);

    // Return the fetched data
    return quotes;
  }),
});
