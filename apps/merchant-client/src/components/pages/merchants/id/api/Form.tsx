import type { IApiForm } from './ApiForm.interface';

import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useCopyText } from '@poluspay-frontend/hooks';
import { httpsUrlRegex, webhookUrlRegex } from '@poluspay-frontend/utils';
import {
    useSetWebhookMutation,
    useUpdateMerchantFieldsMutation,
    useGetMerchantByIdQuery,
    useGenerateSigningKeyMutation,
} from '@poluspay-frontend/merchant-query';

import { PInput, PButton, notify } from '@poluspay-frontend/ui';
import { ReactComponent as IconCopy } from '../../../../../assets/icons/copy.svg';

import './Form.scoped.scss';

interface IMerchantApiFormProps {
    merchantId: string;
}

export const MerchantApiForm = (props: IMerchantApiFormProps) => {
    const copy = useCopyText();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IApiForm>();

    const [updateMerchantFields, { isLoading: isUpdateting }] =
        useUpdateMerchantFieldsMutation();

    const [setWebhook, { isLoading: isSettingWebhook }] =
        useSetWebhookMutation();

    const { data: merchant } = useGetMerchantByIdQuery({
        merchant_id: props.merchantId,
    });

    const [signingKey, setSigningKey] = useState<string>(
        '**********************************'
    );

    const [generateApiKey, { isLoading: isGeneratingApiKey }] =
        useGenerateSigningKeyMutation();

    const updateApiKey = async () => {
        try {
            const { signing_key } = await generateApiKey({
                merchant_id: props.merchantId,
            }).unwrap();

            setSigningKey(signing_key);

            notify({ title: 'Success', status: 'success' });
        } catch (error) {
            console.error(error);
        }
    };

    const submit: SubmitHandler<IApiForm> = async (data) => {
        console.log(data);

        try {
            const promises = [];

            promises.push(
                updateMerchantFields({
                    merchant_id: props.merchantId,
                    fail_redirect_url: data.failRedirectUrl || '',
                    success_redirect_url: data.successRedirectUrl || '',
                }).unwrap()
            );

            promises.push(
                setWebhook({
                    merchant_id: props.merchantId,
                    webhook_url: data.webhookUrl || '',
                }).unwrap()
            );

            await Promise.all(promises);

            notify({ title: 'Success', status: 'success' });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (merchant) {
            const { fail_redirect_url, success_redirect_url, webhook_url } =
                merchant;

            setValue('failRedirectUrl', fail_redirect_url);
            setValue('successRedirectUrl', success_redirect_url);
            setValue('webhookUrl', webhook_url);
        }
    }, [merchant]);

    return (
        <form onSubmit={handleSubmit(submit)} className="form">
            <div className="form__inner">
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Signing key</p>
                    <div className="form__inner-item-container">
                        <div className="form__inner-item-container-input">
                            <PInput
                                readonly
                                overlay={false}
                                value={copy.copied ? 'Copied!' : signingKey}
                                append={
                                    !signingKey.includes('*') && (
                                        <IconCopy
                                            className="form__inner-item-icon"
                                            onClick={() =>
                                                copy.copy(signingKey)
                                            }
                                        />
                                    )
                                }
                            />
                        </div>
                        <div className="form__inner-item-container-button">
                            <PButton
                                type="button"
                                wide
                                loading={isGeneratingApiKey}
                                outline
                                children={<p>Update</p>}
                                onClick={updateApiKey}
                            />
                        </div>
                    </div>
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">URL WebHook</p>
                    <PInput
                        errors={
                            errors.webhookUrl?.message
                                ? [errors.webhookUrl.message]
                                : []
                        }
                        reg={register('webhookUrl', {
                            pattern: {
                                value: webhookUrlRegex,
                                message: 'invalid  WebHook URL',
                            },
                        })}
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Success URL</p>
                    <PInput
                        errors={
                            errors.successRedirectUrl?.message
                                ? [errors.successRedirectUrl.message]
                                : []
                        }
                        reg={register('successRedirectUrl', {
                            pattern: {
                                value: httpsUrlRegex,
                                message: 'invalid Success URL',
                            },
                        })}
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Fail URL</p>
                    <PInput
                        errors={
                            errors.failRedirectUrl?.message
                                ? [errors.failRedirectUrl.message]
                                : []
                        }
                        reg={register('failRedirectUrl', {
                            pattern: {
                                value: httpsUrlRegex,
                                message: 'invalid fail URL',
                            },
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
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
