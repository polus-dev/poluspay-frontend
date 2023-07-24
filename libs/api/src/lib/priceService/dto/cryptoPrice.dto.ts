import Currency from '../../priceService/symbols';

export interface CryptoPrice {
  symbol: Currency;
  priceChange: string;
  priceChangePercent: string;
  prevPrice: string;
  currentPrice: string;
  volume: string;
}
