import { IPayment } from './payment.interface';

interface ReturnPaymentAssetInfo {
    asset?: {
        blockchain: string;
        asset: string;
        amount: string;
    };
}

export const getPaymentAssetInfo = (
    payment: IPayment
): ReturnPaymentAssetInfo => {
    const assets = payment.assets;
    const blockchains = Object.keys(assets);
    if (blockchains.length === 0) {
        return {};
    }

    // @ts-ignore
    const amountInDecimals: Required<ReturnPaymentAssetInfo> = { asset: {} };
    blockchains.forEach((blockchain) => {
        const asset = Object.keys(assets[blockchain])[0];
        const amount = assets[blockchain][asset].amount;
        amountInDecimals.asset = {
            blockchain,
            amount,
            asset,
        };
    });
    return amountInDecimals;
};
