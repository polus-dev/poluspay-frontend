import { useCopyText } from '../../../../../hooks/useCopyText';

import { FormInput } from '@poluspay-frontend/ui';
import { QRCodeSVG } from 'qrcode.react';
import { ReactComponent as IconCopy } from '../../../../../assets/icons/copy.svg';

import './QRCode.scoped.scss';

export const FormQRCode: React.FC = () => {
    const copyAmount = useCopyText();
    const copyAddress = useCopyText();

    return (
        <div className="native">
            <div className="native__title">
                <h6 className="native__title-text">Send MATIC</h6>
                <img
                    className="native__title-image"
                    src="/images/polygon.png"
                    alt="MATIC"
                />
            </div>
            <div className="native__inner">
                <div className="native__qrcode">
                    <QRCodeSVG className="native__qrcode-image" value="qwe" />
                </div>
                <div className="native__data">
                    {/* duplicate of title for desktops */}
                    <div className="native__title native__title--desktop">
                        <h6 className="native__title-text">Send MATIC</h6>
                        <img
                            className="native__title-image"
                            src="/images/polygon.png"
                            alt="MATIC"
                        />
                    </div>
                    <div className="native__data-container">
                        <FormInput
                            label="Amount"
                            value={copyAmount.copied ? 'Copied!' : '123213123'}
                            append={
                                <IconCopy
                                    className="native__data-container-input-icon"
                                    onClick={() => copyAmount.copy('123213123')}
                                />
                            }
                        />
                        <FormInput
                            label="Amount"
                            value={
                                copyAddress.copied
                                    ? 'Copied!'
                                    : 'qweqewewqsgsfgawrf'
                            }
                            append={
                                <IconCopy
                                    className="native__data-container-input-icon"
                                    onClick={() =>
                                        copyAddress.copy('qweqewewqsgsfgawrf')
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
