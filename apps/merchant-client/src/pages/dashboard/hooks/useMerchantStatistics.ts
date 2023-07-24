import {SelectOption} from "@poluspay-frontend/ui";
import {useEffect, useState} from "react";
import {useGetMerchantsQuery} from "@poluspay-frontend/merchant-query";
import {displayMerchantInfo} from "../../../../../pay-form/src/utils/getMerchantInfo";

export const useMerchantStati = () => {
  const {data: merchants} = useGetMerchantsQuery({});
  const [merchantsOptions, setMerchantsOptions] = useState<SelectOption[]>([])
  const [selectedMerchant, setSelectedMerchant] = useState<SelectOption>()

  useEffect(() => {
    if (merchants) {
      const merchantsOptions =
        merchants.data.map((merchant) => ({
          id: merchant.id,
          text: displayMerchantInfo(merchant)
        }))
      setMerchantsOptions(merchantsOptions)
      setSelectedMerchant(merchantsOptions[0])
    }
  }, [merchants])

  return {merchantsOptions, selectedMerchant, setSelectedMerchant}
}
