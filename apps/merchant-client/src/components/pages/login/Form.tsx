import { useEffect, useState } from 'react';
import { emailRegex, EMAIL_CODE_LENGTH } from 'tools/index';

import { notify, PButton, PInput } from '@poluspay-frontend/ui';
import { ConnectButton } from '../../ui/ConnectButton/ConnectButton';
import { ReactComponent as IconMail } from '../../../assets/icons/mail.svg';
import { ReactComponent as LogoGoogle } from '../../../assets/logos/google.svg';

import classNames from 'classnames';

import './Form.scoped.scss';
import { useWalletAuth } from './hooks/useWalletAuth';
import { useEmailAuth } from './hooks/useEmailAuth';
import { doGoogleRedirect } from '../../../store/api/endpoints/auth/googleAuth';

export const LoginForm: React.FC = () => {
    const {
        connectWallet,
        isAuthLoading: isWalletAuthLoading,
        buttonText,
    } = useWalletAuth();
    const {
        sendCode,
        timer,
        isExpired,
        isAuthLoading: isEmailAuthLoading,
    } = useEmailAuth();
    const [stage, setStage] = useState<1 | 2 | 3>(1);

    const [email, setEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState<string[]>([]);

    useEffect(() => {
        if (email) setEmailErrors([]);
        // if (!emailRegex.test(email) && email.length > 0) {
        //     setEmailErrors(['Invalid email']);
        // } else {
        //     setEmailErrors([]);
        // }
    }, [email]);

    const [code, setCode] = useState('');
    const [codeErrors, setCodeErrors] = useState<string[]>([]);

    useEffect(() => {
        if (code.length > EMAIL_CODE_LENGTH && code.length > 0) {
            setCodeErrors(['Invalid code']);
        } else {
            setCodeErrors([]);
        }
    }, [code]);

    const disabled: boolean =
        // (stage === 2 && (!email.length || emailErrors.length > 0)) ||
        stage === 3 && (!code.length || codeErrors.length > 0);

    const handleSubmit = () => {
        if (stage === 2) {
            if (!emailRegex.test(email) && email.length > 0) {
                setEmailErrors(['Invalid email']);
                return;
            } else {
                setEmailErrors([]);
            }
            notify({
                title: 'Email sent',
                description: 'Please check your inbox',
                status: 'success',
            });
            sendCode({ email }).then(() => setStage(3));
        } else if (stage === 3) {
            sendCode({ email, code }).then(() =>
                notify({
                    title: 'Verification',
                    description: 'handle verification code submitting',
                    status: 'success',
                }),
            );
        }
    };

    return (
        <div className="form">
            {stage === 1 && (
                <div className="form__inner">
                    <h1 className="form__inner-title">Login</h1>
                    <div className="form__inner-buttons">
                        <ConnectButton
                            onClick={connectWallet}
                            text={buttonText}
                        />
                        <div className="form__inner-buttons-row">
                            <PButton
                                wide
                                outline
                                size="lg"
                                classname="form__inner-buttons-row-item"
                                children={
                                    <>
                                        <IconMail className="form__inner-buttons-row-item-icon" />
                                        E-mail
                                    </>
                                }
                                onClick={() => setStage(2)}
                            />
                            <PButton
                                wide
                                disabled={true}
                                outline
                                size="lg"
                                classname="form__inner-buttons-row-item"
                                children={
                                    <>
                                        <LogoGoogle className="form__inner-buttons-row-item-icon form__inner-buttons-row-item-icon--google" />
                                        Google
                                    </>
                                }
                                onClick={() => doGoogleRedirect()}
                            />
                        </div>
                    </div>
                </div>
            )}
            {stage !== 1 && (
                <div className="form__inner">
                    <h1 className="form__inner-title form__inner-title--action">
                        Login with E-mail
                    </h1>
                    <div className="form__inner-item">
                        <div className="form__inner-item-data">
                            <p className="form__inner-item-label">E-mail</p>
                            {emailErrors.length > 0 && (
                                <p className="form__inner-item-label form__inner-item-label--error">
                                    {emailErrors[0]}
                                </p>
                            )}
                        </div>
                        <PInput
                            placeholder="email@example.com"
                            value={email}
                            errors={emailErrors}
                            readonly={stage === 3}
                            onInput={(value) => setEmail(value.toString())}
                        />
                    </div>
                    {stage === 3 && (
                        <div className="form__inner-item">
                            <div className="form__inner-item-data">
                                <p className="form__inner-item-label">
                                    Verification code
                                </p>
                                {codeErrors.length > 0 && (
                                    <p className="form__inner-item-label form__inner-item-label--error">
                                        {codeErrors[0]}
                                    </p>
                                )}
                            </div>
                            <PInput
                                placeholder="XXXXXX"
                                value={code}
                                errors={codeErrors}
                                onInput={(value) => setCode(value.toString())}
                            />
                            <div
                                className={classNames('form__inner-item-data', {
                                    'form__inner-item-data--disabled':
                                        !isExpired,
                                })}
                            >
                                <p className="form__inner-item-label form__inner-item-label--timer">
                                    {timer}
                                </p>
                                <p
                                    className="form__inner-item-label form__inner-item-label--action"
                                    onClick={() => sendCode({ email })}
                                >
                                    Resend code
                                </p>
                            </div>
                        </div>
                    )}
                    <PButton
                        loading={isEmailAuthLoading}
                        wide
                        size="lg"
                        disabled={disabled}
                        children={<>Submit</>}
                        onClick={handleSubmit}
                    />
                </div>
            )}
        </div>
    );
};
