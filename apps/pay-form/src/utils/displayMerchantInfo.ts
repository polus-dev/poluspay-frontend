import { IMerchant } from '@poluspay-frontend/api';
import { makeShortHash } from '@poluspay-frontend/utils';

type MerchantInfoParams =
    | 'display_name'
    | 'is_domain_confirmed'
    | 'id'
    | 'domain'
    | 'verified_at';

interface IGetMerchantInfoParams extends Pick<IMerchant, MerchantInfoParams> {}

export const displayMerchantInfo = ({
    display_name,
    is_domain_confirmed,
    id,
    domain,
    verified_at,
}: IGetMerchantInfoParams): string => {
    return (
        (verified_at && display_name) ||
        (is_domain_confirmed && domain.replace('https://', '')) ||
        makeShortHash(id, 6)
    );
};
