import { Asset_t } from "./endpoints/types";
import { ResponseApiCode } from "./responseApiCode";
import {AssetRepresentation} from "@poluspay-frontend/api";

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

type TokenType = "Stable" | "Native" | "Wrapped" | "Other";

export interface Token extends AssetRepresentation {
  name: string;
  //   address: string;
  //   decimals: number;
  // type: TokenType;
  wrapped?: Token;
}
