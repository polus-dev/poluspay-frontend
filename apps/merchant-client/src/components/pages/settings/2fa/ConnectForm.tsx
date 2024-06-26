import type { GoogleAuthAction } from '../../../../pages/settings/Settings';

import { useState } from 'react';

import { useCopyText } from '@poluspay-frontend/hooks';

import { QRCodeSVG } from 'qrcode.react';
import { PButton, FormInput } from '@poluspay-frontend/ui';
import { ReactComponent as Icon2FA } from '../../../../assets/icons/2fa.svg';
import { ReactComponent as IconCopy } from '../../../../assets/icons/copy.svg';

import './ConnectForm.scoped.scss';

interface GoogleAuthProps {
    type: GoogleAuthAction | undefined;
    onCancel: () => void;
    onSubmit: () => void;
}

export const SettingsGoogleConnect: React.FC<GoogleAuthProps> = ({
    type,
    onCancel,
    onSubmit,
}) => {
    const key = 'DFGFH675H8L9WDGK';
    const copy = useCopyText();

    const [code, setCode] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const [connectionStage, setConnectionStage] = useState<1 | 2>(1);

    const paste = async () => {
        const buffer = await navigator.clipboard.readText();

        setCode(buffer);
    };

    const validate = () => {
        // check type (either 'add' or 'remove')
        // check if 2fa code is valid

        onSubmit();
    };

    if (!type) return null;

    return (
        <div className="form">
            <div className="form__inner">
                <div className="form__inner-header">
                    <Icon2FA className="form__inner-header-icon" />
                    <h6 className="form__inner-header-title">
                        Google Authenticator
                    </h6>
                </div>
                <div className="form__inner-divider" />
                {type === 'add' && (
                    <>
                        {connectionStage === 1 ? (
                            <>
                                <div className="form__inner-paragraph">
                                    <p className="form__inner-paragraph-text">
                                        1. Copy the 16-digit key or scan the
                                        QR-code
                                    </p>
                                </div>
                                <div className="form__inner-qrcode">
                                    <div className="form__inner-qrcode-inner">
                                        <QRCodeSVG
                                            className="form__inner-qrcode-image"
                                            value="https://poluspay.com"
                                        />
                                        <div className="form__inner-qrcode-logo">
                                            <img
                                                className="form__inner-qrcode-logo-image"
                                                src="/images/polus.png"
                                                alt="PolusPay"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form__inner-item">
                                    <FormInput
                                        readonly
                                        label="16-digit key"
                                        overlay={false}
                                        value={copy.copied ? 'Copied!' : key}
                                        append={
                                            <IconCopy
                                                className="form__inner-item-input-icon"
                                                onClick={() => copy.copy(key)}
                                            />
                                        }
                                        onInput={() => {}}
                                    />
                                </div>
                                <div className="form__inner-paragraph">
                                    <p className="form__inner-paragraph-text">
                                        2. Open Google Authenticator and add a
                                        new authenticator using the 16-digit key
                                        that you just copied
                                    </p>
                                </div>
                                <div className="form__inner-paragraph">
                                    <p className="form__inner-paragraph-text">
                                        3. Come back and verify the new
                                        authenticator in Polus Pay
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="form__inner-item">
                                <FormInput
                                    placeholder="XXXXXX"
                                    label="Verify App code"
                                    underlabel="Enter the 6-digit code generated by the Authenticator App"
                                    value={code}
                                    error={errors[0]}
                                    append={
                                        <p
                                            className="form__inner-item-input-text"
                                            onClick={paste}
                                        >
                                            Paste
                                        </p>
                                    }
                                    onInput={(value) =>
                                        setCode(value.toString())
                                    }
                                />
                            </div>
                        )}
                    </>
                )}
                {type === 'remove' && (
                    <>
                        <div className="form__inner-item">
                            <FormInput
                                placeholder="XXXXXX"
                                label="Verify App code"
                                underlabel="Enter the 6-digit code to turn off the Two-Factor Authentication"
                                value={code}
                                error={errors[0]}
                                append={
                                    <p
                                        className="form__inner-item-input-text"
                                        onClick={paste}
                                    >
                                        Paste
                                    </p>
                                }
                                onInput={(value) => setCode(value.toString())}
                            />
                        </div>
                    </>
                )}
                <div className="form__inner-buttons">
                    {type === 'add' && connectionStage === 1 ? (
                        <PButton
                            wide
                            children={<p>Next</p>}
                            onClick={() => setConnectionStage(2)}
                        />
                    ) : (
                        // add disabled if code is invalid
                        <PButton
                            wide
                            children={<p>Submit</p>}
                            onClick={validate}
                        />
                    )}
                    <PButton
                        wide
                        outline
                        children={<p>Cancel</p>}
                        onClick={onCancel}
                    />
                </div>
            </div>
        </div>
    );
};
