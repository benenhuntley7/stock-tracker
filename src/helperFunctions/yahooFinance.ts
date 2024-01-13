import yahooFinance from "yahoo-finance2";

export async function getQuote(symbols: string[]) {
  try {
    const result = await Promise.all(
      symbols.map(async (symbol: string) => {
        const quote = await yahooFinance.quote(symbol);
        console.log(`stockName: ${quote.longName}`);
        return {
          symbol,
          longName: quote.longName,
          regularMarketPrice: quote.regularMarketPrice,
        };
      }),
    );

    return {
      result,
    };
  } catch (err) {
    console.error("Error fetching stock quote:", err);

    return {
      result: null,
    };
  }
}
