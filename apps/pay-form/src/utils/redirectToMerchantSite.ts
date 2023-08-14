import { notify } from '@poluspay-frontend/ui';

export const redirectToMerchantSite = (url: string) => {
    notify({ title: 'Back to store', loading: true });
    setTimeout(() => {
        window.location.href = url;
    }, 2000);
};
