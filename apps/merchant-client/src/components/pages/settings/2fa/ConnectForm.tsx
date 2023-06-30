import type { GoogleAuthAction } from '../../../../pages/settings/Settings';

import { useState } from 'react';

import { QRCodeSVG } from 'qrcode.react';

import { PButton, PInput } from '@poluspay-frontend/ui';
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

    const [code, setCode] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const [connectionStage, setConnectionStage] = useState<1 | 2>(1);

    const [copied, setCopied] = useState(false);

    const paste = async () => {
        const buffer = await navigator.clipboard.readText();

        setCode(buffer);
    };

    const copy = async () => {
        if (copied) return undefined;

        await navigator.clipboard.writeText(key);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
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
                                    <div className="form__inner-item-data">
                                        <p className="form__inner-item-data-label">
                                            16-digit key
                                        </p>
                                    </div>
                                    <PInput
                                        readonly
                                        overlay={false}
                                        value={copied ? 'Copied!' : key}
                                        append={
                                            <IconCopy
                                                className="form__inner-item-input-icon"
                                                onClick={copy}
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
                                <div className="form__inner-item-data">
                                    <p className="form__inner-item-data-label">
                                        Verify App code
                                    </p>
                                    {errors.length > 0 && (
                                        <p className="form__inner-item-data-label form__inner-item-data-label--error">
                                            {errors[0]}
                                        </p>
                                    )}
                                </div>
                                <PInput
                                    placeholder="XXXXXX"
                                    value={code}
                                    errors={errors}
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
                                <div className="form__inner-item-data">
                                    <p className="form__inner-item-data-label form__inner-item-data-label--dark">
                                        Enter the 6-digit code generated by the
                                        Authenticator App
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}
                {type === 'remove' && (
                    <>
                        <div className="form__inner-item">
                            <div className="form__inner-item-data">
                                <p className="form__inner-item-data-label">
                                    Verify App code
                                </p>
                                {errors.length > 0 && (
                                    <p className="form__inner-item-data-label form__inner-item-data-label--error">
                                        {errors[0]}
                                    </p>
                                )}
                            </div>
                            <PInput
                                placeholder="XXXXXX"
                                value={code}
                                errors={errors}
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
                            <div className="form__inner-item-data">
                                <p className="form__inner-item-data-label form__inner-item-data-label--dark">
                                    Enter the 6-digit code to turn off the
                                    Two-Factor Authentication
                                </p>
                            </div>
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
