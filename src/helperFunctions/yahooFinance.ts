import type { ChartResultArray } from "node_modules/yahoo-finance2/dist/esm/src/modules/chart";
import yahooFinance from "yahoo-finance2";

type QuoteResult = {
  symbol: string;
  longName: string | undefined;
  regularMarketPrice: number | undefined;
};

export async function getQuote(symbols: string[]): Promise<QuoteResult[]> {
  const results: QuoteResult[] = [];

  try {
    for (const symbol of symbols) {
      const quote = await yahooFinance.quote(symbol);

      results.push({
        symbol,
        longName: quote.longName,
        regularMarketPrice: quote.regularMarketPrice,
      });
    }

    return results;
  } catch (error) {
    return results; // If an error occurs, return the partial results
  }
}

interface SymbolAndPurchasedAt {
  symbol: string;
  purchasedAt: Date; // Adjust the type based on the actual type of purchasedAt
}

export async function getHistory(inputs: SymbolAndPurchasedAt[]): Promise<any> {
  const results: ChartResultArray[] = [];

  for (const { symbol, purchasedAt } of inputs) {
    const history = await yahooFinance.chart(symbol, { period1: purchasedAt });
    results.push(history);
  }

  return results;
}
