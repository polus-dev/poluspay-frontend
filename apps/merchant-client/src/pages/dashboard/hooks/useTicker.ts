import {useEffect, useState} from "react";
import {PriceService} from "../../../../../../libs/api/src/lib/priceService/price.service";
import {TickerProps} from "../../../components/pages/dashboard/Ticker/Ticker";
import Currency from "../../../../../../libs/api/src/lib/priceService/symbols";
import {getAssetUrl} from "../../../../../../tools";

const currencyImagesNameMap = {
  [Currency.BTCUSDT]: 'btc',
  [Currency.ETHUSDT]: 'eth',
  [Currency.BNBUSDT]: 'bnb',
  [Currency.SOLUSDT]: 'sol',
}

export const useTicker = () => {

const [tickers, setTickers] = useState<TickerProps[]>()

  useEffect(() => {
    const priceService = new PriceService(import.meta.env.VITE_REACT_APP_PRICE_URL);
    priceService.startMainLoop((prices) => setTickers(prices.map(price => ({shift: price.priceChange, name: price.symbol, fullName: price.symbol, price: Number(price.currentPrice).toFixed(2), shiftPercent: price.priceChangePercent, image: getAssetUrl(import.meta.env.VITE_REACT_APP_ASSET_URL, currencyImagesNameMap[price.symbol])}))));
    return () => priceService.stopMainLoop();
  }, [])

  return {tickers}

}
