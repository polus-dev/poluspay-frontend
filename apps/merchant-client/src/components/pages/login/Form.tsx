import { useState } from 'react';

import PButton from '../../ui/PButton/PButton';
import PInput from '../../ui/PInput/PInput';
import ConnectButton from '../../ConnectButton/ConnectButton';
import { ReactComponent as IconMail } from '../../../assets/icons/mail.svg';
import { ReactComponent as LogoGoogle } from '../../../assets/logos/google.svg';

import classNames from 'classnames';

import './Form.scoped.scss';

const LoginForm: React.FC = () => {
    const [stage, setStage] = useState<1 | 2 | 3>(1);

    const [email, setEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState<string[]>([]);

    const [code, setCode] = useState('');
    const [codeErrors, setCodeErrors] = useState<string[]>([]);

    const disabled: boolean =
        (stage === 2 && (!email.length || emailErrors.length > 0)) ||
        (stage === 3 && (!code.length || codeErrors.length > 0));

    const sendCode = () => {
        console.log('send the request to resend  code on user`s email');
    };

    const handleSubmit = () => {
        if (stage === 2) {
            console.log('handle email submitting');
            setStage(3);
        } else if (stage === 3) {
            console.log('handle verification code submitting');
        }
    };

    return (
        <div className="form">
            {stage === 1 && (
                <div className="form__inner">
                    <h1 className="form__inner-title">Login</h1>
                    <div className="form__inner-buttons">
                        <ConnectButton />
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
                                outline
                                size="lg"
                                classname="form__inner-buttons-row-item"
                                children={
                                    <>
                                        <LogoGoogle className="form__inner-buttons-row-item-icon form__inner-buttons-row-item-icon--google" />
                                        Google
                                    </>
                                }
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
                            readonly={stage === 3}
                            value={email}
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
                                onInput={(value) => setCode(value.toString())}
                            />
                            {/* disabled class needs to be added only when timer !== 00:00
                            so put the disabled condition below instead of true */}
                            <div
                                className={classNames('form__inner-item-data', {
                                    'form__inner-item-data--disabled': true,
                                })}
                            >
                                <p className="form__inner-item-label form__inner-item-label--timer">
                                    timer
                                </p>
                                <p
                                    className="form__inner-item-label form__inner-item-label--action"
                                    onClick={sendCode}
                                >
                                    Resend code
                                </p>
                            </div>
                        </div>
                    )}
                    <PButton
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

export default LoginForm;
