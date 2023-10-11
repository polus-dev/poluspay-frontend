import type { Payment } from '../../../../store/api/endpoints/payment/Payment.interface';

import { AssetRepresentation } from '@poluspay-frontend/api';
import { getAssetUrl } from '@poluspay-frontend/utils';

import { FormQRCode } from './QRCode/QRCode';
import { FormWarning } from './Warning/Warning';

import './Native.scoped.scss';

interface IFormNativePaymentProps {
    payment: Payment;
    availableTokens: AssetRepresentation[];
    currentBlockchain: string;
}

const getPaymentAssetInfo = (payment: Payment, blockchain: string) => {
    const assetName = payment.assets[0].name;
    const paymentInfo = payment.assets.find((e) => e.network === blockchain);

    if (!paymentInfo) {
        throw new Error('Payment info is not defined');
    }

    return { assetName, paymentInfo };
};

export const FormNativePayment = (props: IFormNativePaymentProps) => {
    const { paymentInfo, assetName } = getPaymentAssetInfo(
        props.payment,
        props.currentBlockchain
    );

    return (
        <div className="native">
            <div className="native__qrcode">
                <FormQRCode
                    amount={paymentInfo.amount_decimals}
                    address={paymentInfo.address}
                    assetName={paymentInfo.name}
                    assetImage={getAssetUrl(
                        import.meta.env.VITE_ASSET_URL,
                        paymentInfo.name
                    )}
                    blockchain={props.currentBlockchain}
                />
            </div>
            <div className="native__warning">
                <FormWarning
                    name={assetName}
                    amount={paymentInfo.amount_decimals}
                />
            </div>
        </div>
    );
};
