import { IPaymentMerchant } from '@poluspay-frontend/api';
import { makeShortHash } from '../../../../tools';

export const displayMerchantInfo = (merchant: IPaymentMerchant) => {
    if (!merchant.is_domain_confirmed && !merchant.display_name) {
        return makeShortHash(merchant.id, 6);
    } else if (merchant.is_domain_confirmed && !merchant.display_name) {
        return merchant.domain.replace('https://', '');
    } else if (merchant.is_domain_confirmed && merchant.display_name) {
        return merchant.display_name;
    }
};
