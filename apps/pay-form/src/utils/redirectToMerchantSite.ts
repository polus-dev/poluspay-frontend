import { notify } from '@poluspay-frontend/ui';

export const redirectToMerchantSite = (url: string): void => {
    notify({ title: 'Back to store', loading: true });

    setTimeout(() => {
        window.open(url, '_self');
    }, 2000);
};
