import {useEffect, useState} from "react";
import {PriceService} from "../../../../../../libs/api/src/lib/priceService/price.service";
import {TickerProps} from "../../../components/pages/dashboard/Ticker/Ticker";

export const useTicker = () => {

const [tickers, setTickers] = useState<TickerProps[]>()

  useEffect(() => {
    const priceService = new PriceService(import.meta.env.VITE_REACT_APP_PRICE_URL, import.meta.env.DEV ? 'dev' : 'prod');
    priceService.startMainLoop((prices) => setTickers(prices.map(price => ({shift: price.priceChange, name: price.symbol, fullName: price.symbol, price: Number(price.currentPrice).toFixed(2), shiftPercent: price.priceChangePercent}))));
    return () => priceService.stopMainLoop();
  }, [])

  return {tickers}

}
