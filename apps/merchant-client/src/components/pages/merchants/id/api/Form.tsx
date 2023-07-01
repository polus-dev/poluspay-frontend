import { useEffect, useState } from 'react';

import { PInput, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconView } from '../../../../../assets/icons/view.svg';
import { ReactComponent as IconHide } from '../../../../../assets/icons/hide.svg';

import './Form.scoped.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IApiForm } from './ApiForm.interface';
import { useParams } from 'react-router';
import {
    useSetWebhookMutation,
    useUpdateMerchantFieldsMutation,
} from '@poluspay-frontend/merchant-query';
import { httpsUrlRegex } from 'tools';

export const MerchantApiForm: React.FC = () => {
    const { register, handleSubmit } = useForm<IApiForm>();
    const [updateMerchantFields, { isLoading: isUpdateting }] =
        useUpdateMerchantFieldsMutation();
    const [setWebhook, { isLoading: isSettingWebhook }] =
        useSetWebhookMutation();
    const { id: merchantId } = useParams<{ id: string }>();
    if (!merchantId) {
        return <></>;
    }
    const submit: SubmitHandler<IApiForm> = async (data) => {
        try {
            const promises = [];
            if (data.failRedirectUrl || data.successRedirectUrl) {
                promises.push(
                    updateMerchantFields({
                        merchant_id: merchantId,
                        fail_redirect_url: data.failRedirectUrl,
                        success_redirect_url: data.successRedirectUrl,
                    }).unwrap()
                );
            }
            if (data.webhookUrl) {
                promises.push(
                    setWebhook({
                        merchant_id: merchantId,
                        webhook_url: data.webhookUrl,
                    }).unwrap()
                );
            }
            await Promise.all(promises);
        } catch (error) {
            console.error(error);
        }
    };
    const apiKey = 'dfsryJGHJN65grfvbfghxg';
    const [bluredApiKey, setBluredApiKey] = useState('');
    const [visible, setVisible] = useState(false);

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
        <form onSubmit={handleSubmit(submit)} className="form">
            <div className="form__inner">
                <div className="form__inner-item">
                    <p className="form__inner-item-label">API key</p>
                    <div className="form__inner-item-container">
                        <div className="form__inner-item-container-input">
                            <PInput
                                readonly
                                reg={register('apiKey')}
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
                                type="button"
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
                        reg={register('webhookUrl', { pattern: httpsUrlRegex })}
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Success URL</p>
                    <PInput
                        reg={register('successRedirectUrl', {
                            pattern: httpsUrlRegex,
                        })}
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Fail URL</p>
                    <PInput
                        reg={register('failRedirectUrl', {
                            pattern: httpsUrlRegex,
                        })}
                    />
                </div>
                <div className="form__inner-button">
                    <div className="form__inner-button-item">
                        {/* add disabled if no changes were made */}
                        <PButton
                            wide
                            loading={isSettingWebhook || isUpdateting}
                            disabled={false}
                            children={<p>Save</p>}
                            onClick={() => console.log('save changes')}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};