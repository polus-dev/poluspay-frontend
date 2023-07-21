import { Asset_t, Blockchain_t } from "../endpoints/types";
export const findAsset = (
  assets: string,
  asset: Asset_t,
  blockchain: Blockchain_t
) => {
  // @ts-ignore
  return assets[asset][blockchain];
};
