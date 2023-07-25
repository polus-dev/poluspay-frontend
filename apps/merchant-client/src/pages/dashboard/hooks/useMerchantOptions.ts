import {useGetMerchantsQuery} from "@poluspay-frontend/merchant-query";
import {useEffect, useState} from "react";
import {SelectOption} from "@poluspay-frontend/ui";
import {displayMerchantInfo} from "../../../../../pay-form/src/utils/getMerchantInfo";

export const useMerchantOptions = () => {
  const {data: merchants} = useGetMerchantsQuery({});
  const [merchantsOptions, setMerchantsOptions] = useState<SelectOption[]>([])
  const [selectedMerchant, setSelectedMerchant] = useState<SelectOption>()

  useEffect(() => {
    if (merchants) {
      const merchantsOptions =
        merchants.data.map((merchant) => ({
          id: merchant.id,
          text: merchant.name,
        }))
      setMerchantsOptions(merchantsOptions)
      setSelectedMerchant(merchantsOptions[0])
    }
  }, [merchants])

  return {merchantsOptions, selectedMerchant, setSelectedMerchant}
}
