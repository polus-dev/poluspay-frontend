import { useEffect, useState } from "react";
import { useGetAssetsQuery } from "../../../store/api/endpoints/asset/Asset";
import {
  Asset_t,
  Blockchain_t,
  WrappedToken,
} from "../../../store/api/endpoints/types";
import { useAppSelector } from "../../../store/hooks";
import { Token } from "../../../store/api/types";


export const useAvailableTokens = () => {
  const [availableTokens, setAvailableTokens] = useState<Token[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);

  const currentBlockchain = useAppSelector(
    (state) => state.connection.currentBlockchain
  );
  const { data: assets, isLoading } = useGetAssetsQuery();

  useEffect(() => {
    if (assets && currentBlockchain) {
      setAvailableTokens(
        assets.getAssetsByNetwork(currentBlockchain)
      );
      setAvailableCategories(Array.from(new Set(assets.getAssetsByNetwork(currentBlockchain).map(el => el.categories).flat())))
    }
  }, [currentBlockchain, assets]);
  return { availableTokens, isAvailableTokensLoading: isLoading, availableCategories };
};
