import { useGetMerchantsQuery } from "@poluspay-frontend/merchant-query";
import { useEffect, useState } from "react";
import { SelectOption } from "@poluspay-frontend/ui";

const trimMerchantName = (name: string) => name.length > 15 ? name.slice(0, 12) + '...' : name

export const useMerchantOptions = () => {
  const { data: merchants } = useGetMerchantsQuery({});
  const [merchantsOptions, setMerchantsOptions] = useState<SelectOption[]>([])
  const [selectedMerchant, setSelectedMerchant] = useState<SelectOption>()
  const [merchantsAmount, setMerchantsAmount] = useState<number>()

  useEffect(() => {
    if (merchants) {
      const merchantsOptions =
        merchants.data.map((merchant) => ({
          id: merchant.id,
          text: trimMerchantName(merchant.name),
        }))
      setMerchantsOptions(merchantsOptions)
      setMerchantsAmount(merchants.totalCount)
    }
  }, [merchants])

  return { merchantsOptions, selectedMerchant, setSelectedMerchant, merchantsAmount }
}
