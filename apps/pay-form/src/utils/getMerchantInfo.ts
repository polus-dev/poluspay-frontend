import { IPaymentMerchant } from '@poluspay-frontend/api';
import { makeShortHash } from '../../../../tools';

export const displayMerchantInfo = (merchant: IPaymentMerchant) =>
     merchant.display_name || merchant.is_domain_confirmed
         && merchant.domain.replace('https://', '')
         || makeShortHash(merchant.id, 6);
