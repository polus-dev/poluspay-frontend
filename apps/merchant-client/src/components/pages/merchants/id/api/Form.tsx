import { useEffect, useState } from 'react';

import { PInput, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconView } from '../../../../../assets/icons/view.svg';
import { ReactComponent as IconHide } from '../../../../../assets/icons/hide.svg';

import './Form.scoped.scss';

export const MerchantApiForm: React.FC = () => {
    const apiKey = 'dfsryJGHJN65grfvbfghxg';
    const [bluredApiKey, setBluredApiKey] = useState('');
    const [visible, setVisible] = useState(false);

    const [webhookUrl, setWebhookUrl] = useState('');
    const [successUrl, setSuccessUrl] = useState('');
    const [failUrl, setFailUrl] = useState('');

    const blurText = () => {
        const blured = apiKey.replace(/./g, '*');

        setBluredApiKey(blured);
    };

    const toggle = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        blurText();
    }, [apiKey]);

    return (
        <div className="form">
            <div className="form__inner">
                <div className="form__inner-item">
                    <p className="form__inner-item-label">API key</p>
                    <div className="form__inner-item-container">
                        <div className="form__inner-item-container-input">
                            <PInput
                                readonly
                                overlay={false}
                                value={visible ? apiKey : bluredApiKey}
                                append={
                                    <div
                                        className="form__inner-item-icon-container"
                                        onClick={toggle}
                                    >
                                        {visible ? (
                                            <IconHide className="form__inner-item-icon" />
                                        ) : (
                                            <IconView className="form__inner-item-icon" />
                                        )}
                                    </div>
                                }
                                onInput={() => {}}
                            />
                        </div>
                        <div className="form__inner-item-container-button">
                            <PButton
                                wide
                                outline
                                children={<p>Update</p>}
                                onClick={() => console.log('update apiKey')}
                            />
                        </div>
                    </div>
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">URL WebHook</p>
                    <PInput
                        value={webhookUrl}
                        onInput={(value) => setWebhookUrl(value.toString())}
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Success URL</p>
                    <PInput
                        value={successUrl}
                        onInput={(value) => setSuccessUrl(value.toString())}
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Fail URL</p>
                    <PInput
                        value={failUrl}
                        onInput={(value) => setFailUrl(value.toString())}
                    />
                </div>
                <div className="form__inner-button">
                    <div className="form__inner-button-item">
                        {/* add disabled if no changes were made */}
                        <PButton
                            wide
                            disabled={false}
                            children={<p>Save</p>}
                            onClick={() => console.log('save changes')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
