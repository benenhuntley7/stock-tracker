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

type HistoryResult = {
  symbol: string;
  date: Date;
  price: number;
};
export async function getHistory(symbols: string[]): Promise<HistoryResult[]> {
  // Assuming you will fetch data from some source, for now, let's return a dummy data.
  const dummyData: HistoryResult[] = symbols.map((symbol) => ({
    symbol: symbol,
    date: new Date(Date.now()),
    price: 2,
  }));
  // Simulating an asynchronous operation with a delay
  return dummyData;
}
