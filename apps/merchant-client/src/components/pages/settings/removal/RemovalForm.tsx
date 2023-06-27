import { useState } from 'react';

import PInput from '../../../ui/PInput/PInput';
import PButton from '../../../ui/PButton/PButton';
import { ReactComponent as IconWarning } from '../../../../assets/icons/warning.svg';

import './RemovalForm.scoped.scss';

interface RemovalFormProps {
    onDelete: () => void;
    onCancel: () => void;
}

const SettingsRemovalForm: React.FC<RemovalFormProps> = ({
    onDelete,
    onCancel,
}) => {
    const isConnected2FA = true;

    const [email, setEmail] = useState('');
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [emailTimer, setEmailTimer] = useState(false);

    const [code, setCode] = useState('');
    const [codeErrors, setCodeErrors] = useState<string[]>([]);

    const disabled = (): boolean => {
        return isConnected2FA
            ? email.length == 0 || code.length == 0
            : email.length == 0;
    };

    return (
        <div className="form">
            <div className="form__inner">
                <div className="form__inner-header">
                    <h4 className="form__inner-header-title">
                        Account removal
                    </h4>
                    <div className="form__inner-header-description">
                        <IconWarning className="form__inner-header-description-icon" />
                        <p className="form__inner-header-description-text">
                            By deleting the account, you delete all information
                            associated with your account, including merchants,
                            statistics and profile data
                        </p>
                    </div>
                </div>
                <div className="form__inner-divider" />
                <div className="form__inner-item">
                    <div className="form__inner-item-data">
                        <p className="form__inner-item-data-label">
                            Verify Email code
                        </p>
                        {emailErrors.length > 0 && (
                            <p className="form__inner-item-data-label form__inner-item-data-label--error">
                                {emailErrors[0]}
                            </p>
                        )}
                    </div>
                    <PInput
                        placeholder="XXXXXX"
                        value={email}
                        append={
                            <>
                                {emailTimer ? (
                                    <p className="form__inner-item-input-append">
                                        Timer
                                    </p>
                                ) : (
                                    <p
                                        className="form__inner-item-input-append form__inner-item-input-append--action"
                                        onClick={() => setEmailTimer(true)}
                                    >
                                        Send
                                    </p>
                                )}
                            </>
                        }
                        onInput={(value) => setEmail(value.toString())}
                    />
                    <div className="form__inner-item-data">
                        <p className="form__inner-item-data-label form__inner-item-data-label--dark">
                            Enter the code to continue
                        </p>
                    </div>
                </div>
                {isConnected2FA && (
                    <div className="form__inner-item form__inner-item--spaced">
                        <div className="form__inner-item-data">
                            <p className="form__inner-item-data-label">
                                Verify Google 2FA code
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
                                Enter the 6-digit code to continue
                            </p>
                        </div>
                    </div>
                )}
                <div className="form__inner-buttons">
                    <PButton
                        wide
                        disabled={disabled()}
                        children={<p>Delete account</p>}
                        onClick={onDelete}
                    />
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

export default SettingsRemovalForm;
