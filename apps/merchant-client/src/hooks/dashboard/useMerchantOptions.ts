import { useEffect, useState } from 'react';
import { useGetMerchantsQuery } from '@poluspay-frontend/merchant-query';
import { trimEndOfString } from '@poluspay-frontend/utils';

import { SelectOption } from '@poluspay-frontend/ui';

interface IUseMerchantOptions {
    setMerchantsOptions: (arg: SelectOption[]) => void;
}
export const useMerchantOptions = ({
    setMerchantsOptions,
}: IUseMerchantOptions) => {
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
