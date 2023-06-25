import { useState } from "react"

import PInput from "../../ui/PInput/PInput"
import { ReactComponent as IconPlus } from '../../../assets/icons/plus.svg'
import PButton from "../../ui/PButton/PButton"

import './Form.scoped.scss'

interface SettingsFormProps {
    onFinish: () => void
}

const SettingsForm: React.FC<SettingsFormProps> = ({
    onFinish
}) => {
    // replace with real data about user connection type
    // either with email or wallet
    const connectedWithEmail = false

    // replace with actual data
    const connectedWallet = '0x5ff4e5656a733a0dfda0f95ae9a81c228d361970'
    const connectedEmail = 'polus.info@gmail.com'

    const [stage, setStage] = useState(1)

    const [email, setEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState<string[]>([]);

    const [code, setCode] = useState('');
    const [codeErrors, setCodeErrors] = useState<string[]>([]);

    const disabled: { email: boolean, code: boolean } = {
        email: (!email || emailErrors.length > 0),
        code: (!code || code.length < 6 || codeErrors.length > 0)
    }

    const getShortAddress = () => {
        return `${connectedWallet.slice(0, 8)}...${connectedWallet.slice(-8)}`
    }

    const resetForm = () => {
        setStage(1)
        setEmail('')
        setEmailErrors([])
        setCodeErrors([])
    }

    const submitVerificationCode = () => {
        console.log('submit code')

        onFinish()
    }

    return (
        <div className="form">
            <h4 className="form__title">
                Settings
            </h4>
            {connectedWithEmail ? (
                <div className="form__inner">
                    <div className="form__inner-item">
                        <div className="form__inner-item-data">
                            <p className="form__inner-item-data-label">
                                Email address
                            </p>
                        </div>
                        <PInput
                            readonly
                            value={connectedEmail}
                            onInput={() => {}}
                        />
                    </div>
                </div>
            ) : (
                <div className="form__inner">
                    <div className="form__inner-item">
                        <div className="form__inner-item-data">
                            <p className="form__inner-item-data-label">
                                Wallet
                            </p>
                        </div>
                        <PInput
                            readonly
                            value={getShortAddress()}
                            onInput={() => {}}
                        />
                    </div>
                    <div className="form__inner-item">
                        <div className="form__inner-item-data">
                            <p className="form__inner-item-data-label">
                                Email address
                            </p>
                            {(stage === 2 && emailErrors.length > 0) && (
                                <p className="form__inner-item-data-label form__inner-item-data-label--error">
                                    {emailErrors[0]}
                                </p>
                            )}
                        </div>
                        {stage === 1 && (
                            <div
                                onClick={() => setStage(2)}
                                className="form__inner-action"
                            >
                                <IconPlus className="form__inner-action-icon" />
                                <p className="form__inner-action-text">
                                    Add email
                                </p>
                            </div>
                        )}
                        {stage > 1 && (
                            <PInput
                                placeholder="example@gmail.com"
                                value={email}
                                readonly={stage === 3}
                                onInput={(value) => setEmail(value.toString())}
                            />
                        )}
                    </div>
                    {stage === 3 && (
                        <div className="form__inner-item">
                            <div className="form__inner-item-data">
                                <p className="form__inner-item-data-label">
                                    Verification code
                                </p>
                                {codeErrors.length > 0 && (
                                    <p className="form__inner-item-data-label form__inner-item-data-label--error">
                                        {codeErrors[0]}
                                    </p>
                                )}
                            </div>
                            <PInput
                                placeholder="XXXXXX"
                                value={code}
                                onInput={(value) => setCode(value.toString())}
                            />
                            <div className="form__inner-item-data">
                                <p className="form__inner-item-data-label form__inner-item-data-label--dark">
                                    timer
                                </p>
                                <p
                                    className="form__inner-item-data-label form__inner-item-data-label--action"
                                    onClick={() => console.log('resend code')}
                                >
                                    Resend code
                                </p>
                            </div>
                        </div>
                    )}
                    {stage > 1 && (
                        <div className="form__inner-buttons">
                            <div className="form__inner-buttons-item">
                                <PButton
                                    wide
                                    outline
                                    children={
                                        <p>Cancel</p>
                                    }
                                    onClick={resetForm}
                                />
                            </div>
                            <div className="form__inner-buttons-item">
                                {stage === 2 && (
                                    <PButton
                                        wide
                                        disabled={disabled.email}
                                        children={
                                            <p>Send code</p>
                                        }
                                        onClick={() => setStage(3)}
                                    />
                                )}
                                {stage === 3 && (
                                    <PButton
                                        wide
                                        disabled={disabled.code}
                                        children={
                                            <p>Confirm</p>
                                        }
                                        onClick={submitVerificationCode}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default SettingsForm
