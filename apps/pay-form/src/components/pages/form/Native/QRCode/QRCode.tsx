import { useCopyText } from '../../../../../hooks/useCopyText';

import { FormInput } from '@poluspay-frontend/ui';
import { QRCodeSVG } from 'qrcode.react';
import { ReactComponent as IconCopy } from '../../../../../assets/icons/copy.svg';

import './QRCode.scoped.scss';

interface QRCodeProps {
    assetName: string;
    assetImage: string;
    amount: string;
    address: string;
    blockchain: string;
}

export const FormQRCode = (props: QRCodeProps) => {
    const copyAmount = useCopyText();
    const copyAddress = useCopyText();
    return (
        <div className="native">
            <div className="native__title">
                <h6 className="native__title-text">Send ${props.assetName}</h6>
                <img
                    className="native__title-image"
                    src={props.assetImage}
                    alt={props.assetName}
                />
            </div>
            <div className="native__inner">
                <div className="native__qrcode">
                    <QRCodeSVG
                        className="native__qrcode-image"
                        value={`${props.blockchain}:${props.address}?value=${props.amount}`}
                    />
                </div>
                <div className="native__data">
                    {/* duplicate of title for desktops */}
                    <div className="native__title native__title--desktop">
                        <h6 className="native__title-text">
                            Send {props.assetName}
                        </h6>
                        <img
                            className="native__title-image"
                            src={props.assetImage}
                            alt={props.assetName}
                        />
                    </div>
                    <div className="native__data-container">
                        <FormInput
                            label="Wallet"
                            value={
                                copyAmount.copied ? 'Copied!' : props.address
                            }
                            append={
                                <IconCopy
                                    className="native__data-container-input-icon"
                                    onClick={() =>
                                        copyAmount.copy(props.address)
                                    }
                                />
                            }
                        />
                        <FormInput
                            label="Amount"
                            value={
                                copyAddress.copied ? 'Copied!' : props.amount
                            }
                            append={
                                <IconCopy
                                    className="native__data-container-input-icon"
                                    onClick={() =>
                                        copyAddress.copy(props.amount)
                                    }
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
