// server/api/trpc.ts

import yahooFinance from "yahoo-finance2";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type QuoteInput = {
  input?: string;
};

export const yahooFinanceRouter = createTRPCRouter({
  quote: publicProcedure.query(async ({ input }: QuoteInput = {}) => {
    const symbol = input as string;

    if (!symbol) {
      // Handle the case where symbol is undefined
      return { error: "Symbol is undefined" };
    }

    try {
      // Fetch data from Yahoo Finance
      const quote = await yahooFinance.quote(symbol);
      return quote;
    } catch (err) {
      return err;
    }
  }),
});
