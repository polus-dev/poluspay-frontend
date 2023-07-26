import type { TickerProps } from "../../components/pages/dashboard/Tickers/TickerElement/TickerElement";

import { useEffect, useState } from "react";

import Currency from "../../../../../libs/api/src/lib/priceService/symbols";
import { PriceService } from "../../../../../libs/api/src/lib/priceService/price.service";
import { getAssetUrl } from "tools";

const currencyNameMap = {
  [Currency.BTCUSDT]: 'btc',
  [Currency.ETHUSDT]: 'eth',
  [Currency.BNBUSDT]: 'bnb',
  [Currency.SOLUSDT]: 'sol',
}

export const useTicker = () => {

const [tickers, setTickers] = useState<TickerProps[]>()

  useEffect(() => {
    const priceService = new PriceService(import.meta.env.VITE_PRICE_URL);
    priceService.startMainLoop((prices) => setTickers(prices.map(price => ({shift: price.priceChange, name: currencyNameMap[price.symbol].toUpperCase(), fullName: price.symbol, price: Number(price.currentPrice).toFixed(2), shiftPercent: price.priceChangePercent, image: getAssetUrl(import.meta.env.VITE_ASSET_URL, currencyNameMap[price.symbol])}))));
    return () => priceService.stopMainLoop();
  }, [])

  return {tickers}

}
