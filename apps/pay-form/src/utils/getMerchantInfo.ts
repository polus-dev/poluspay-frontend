import {IMerchant} from '@poluspay-frontend/api';
import { makeShortHash } from '../../../../tools';

interface IGetMerchantInfoParams extends Pick<IMerchant, "display_name" | "is_domain_confirmed" | "id" | "domain">{}

export const displayMerchantInfo = (merchant: IGetMerchantInfoParams) =>
     merchant.display_name || merchant.is_domain_confirmed
         && merchant.domain.replace('https://', '')
         || makeShortHash(merchant.id, 6);
