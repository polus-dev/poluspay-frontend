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
    // blockchains.forEach((blockchain) => {
    //     const asset = assets[0].name;
    //     const amount = assets[blockchain][asset].amount;
    //     amountInDecimals.asset = {
    //         blockchain,
    //         amount,
    //         asset,
    //     };
    // });
    amountInDecimals.asset = {
        asset: assets[0].name,
        amount: assets[0].amount,
        blockchain: assets[0].network,
    };

    return amountInDecimals;
};
