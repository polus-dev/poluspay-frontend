import { ResponseApiCode } from "./responseApiCode";
import { RootState } from "../store";

export interface ApiConfig {
  state: RootState;
}

export interface IPagination {
  offset?: number;
  limit?: number;
}

export interface IResponseApiDefault {
  code: ResponseApiCode;
  message: string;
  field?: string;
}
export type IResponseError = IResponseApiDefault;

export type Blockchain_t =
  | "arbitrum"
  | "bsc"
  | "ethereum"
  | "polygon"
  | "tron"
  | "bitcoin"
  | "dogecoin"
  | "litecoin";

export type Asset_t =
  | "usdt"
  | "usdc"
  | "dai"
  | "busd"
  | "matic"
  | "eth"
  | "bnb"
  | "trx"
  | "wbtc"
  | "weth"
  | "wmatic"
  | "btc"
  | "ltc"
  | "doge";
