import { useGetMerchantsQuery } from '@poluspay-frontend/merchant-query';
import { useEffect, useState } from 'react';
import { SelectOption } from '@poluspay-frontend/ui';
import { trimEndOfString } from '../../../../../tools';

interface IUseMerchantOptions {
    setMerchantsOptions: (arg: SelectOption[]) => void;
}
export const useMerchantOptions = ({setMerchantsOptions}: IUseMerchantOptions) => {
    const { data: merchants } = useGetMerchantsQuery({});
    const [selectedMerchant, setSelectedMerchant] = useState<SelectOption>();
    const [merchantsAmount, setMerchantsAmount] = useState(-1);

    useEffect(() => {
        if (merchants) {
            const merchantsOptions = [
                { text: 'All merchants' },
                ...merchants.data.map((merchant) => ({
                    id: merchant.id,
                    text: trimEndOfString(merchant.name, 10),
                })),
            ];
            setMerchantsOptions(merchantsOptions);
            setMerchantsAmount(merchants.totalCount);
            if (merchantsOptions.length > 0) {
                setSelectedMerchant(merchantsOptions[0]);
            }
        }
    }, [merchants]);

    return {
        selectedMerchant,
        setSelectedMerchant,
        merchantsAmount,
    };
};
