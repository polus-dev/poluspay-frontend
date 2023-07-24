import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useModal } from '@poluspay-frontend/hooks';
import { useCopyText } from '../../../../../../hooks/useCopyText';

import { PButton, FormInput } from '@poluspay-frontend/ui';
import { MerchantProfileAvatar } from './Avatar';
import { ModalMerchantDelete } from '../../../../../modals/MerchantDelete/MerchantDelete';
import { ModalMerchantAvatar } from '../../../../../modals/MerchantAvatar/MerchantAvatar';
import { ReactComponent as IconCopy } from '../../../../../../assets/icons/copy.svg';
import {
    useDeleteMerchantMutation,
    useGetMerchantByIdQuery,
    useUpdateMerchantFieldsMutation,
    useUploadLogoMutation,
} from '@poluspay-frontend/merchant-query';

import classNames from 'classnames';

import './Form.scoped.scss';

import { useParams } from 'react-router-dom';
import { IMerchantForm } from '../../../Form.interface';
import { useGetMerchantIdFromParams } from '../../../../../../hooks/useGetMerchantId';
import { httpsUrlRegex } from '../../../../../../../../../tools';

export const MerchantProfileForm: React.FC = () => {
    const modalDelete = useModal();
    const modalAvatar = useModal();
    const copy = useCopyText();

    const merchantId = useGetMerchantIdFromParams();

    const [deleteMerchant, { isLoading: isDeleteMerchantLoading }] =
        useDeleteMerchantMutation();
    const [updateMerchantFields, { isLoading: isUpdatingMerchantFields }] =
        useUpdateMerchantFieldsMutation();
    const { data: merchant, isLoading: isGetMerchantByIdLoading } =
        useGetMerchantByIdQuery({ merchant_id: merchantId });
    const [uploadLogo, { isLoading: isLogoUploading }] =
        useUploadLogoMutation();

    const { register, handleSubmit, reset } = useForm<IMerchantForm>();
    useEffect(() => {
        if (merchant) {
            reset({
                website: merchant.domain ?? undefined,
                description: merchant.description ?? undefined,
                merchantName: merchant.name,
                brand: merchant.display_name ?? undefined,
            });
        }
    }, [merchant]);

    const getShortMerchantId = () => {
        return `${merchantId.slice(0, 8)}...${merchantId.slice(-8)}`;
    };

    const handleMerchantRemoval = async () => {
        // modal passes this prop only when merchant name entered correctly
        // close modal, then remove merchant, then navigate to /merchants
        // then show the notification about successfull removal
        try {
            await deleteMerchant({ merchant_id: merchantId });
            console.log('remove merchant');
        } catch (error) {
            console.error(error);
        }
    };

    const submit: SubmitHandler<IMerchantForm> = async (data) => {
        try {
            await updateMerchantFields({
                description: data.description,
                name: data.merchantName,
                domain: data.website,
                merchant_id: merchantId,
                display_name: data.brand,
            }).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {/*TODO: Refactor*/}
            {isGetMerchantByIdLoading ? (
                <p>Loading...</p>
            ) : !merchant ? (
                <p>Merchant not found</p>
            ) : (
                <form onSubmit={handleSubmit(submit)} className="form">
                    <h4 className="form__title">Merchant</h4>
                    <div className="form__inner">
                        <div className="form__inner-user">
                            <div className="form__inner-user__avatar">
                                <MerchantProfileAvatar
                                    image={merchant.logo}
                                    avatarStatus={merchant.logo_status}
                                    openModal={() => modalAvatar.open()}
                                />
                            </div>
                            <div className="form__inner-user__data">
                                <p className="form__inner-user__data-name">
                                    {merchant?.name}
                                </p>
                                <div className="form__inner-user__data-id">
                                    <p
                                        className={classNames({
                                            'form__inner-user__data-id-value':
                                                true,
                                            'form__inner-user__data-id-value--blue':
                                                copy.copied,
                                        })}
                                    >
                                        {copy.copied
                                            ? 'Copied!'
                                            : getShortMerchantId()}
                                    </p>
                                    <p
                                        className={classNames({
                                            'form__inner-user__data-id-value':
                                                true,
                                            'form__inner-user__data-id-value--blue':
                                                copy.copied,
                                            'form__inner-user__data-id-value--desktop':
                                                true,
                                        })}
                                    >
                                        {copy.copied ? 'Copied!' : merchantId}
                                    </p>
                                    <IconCopy
                                        className="form__inner-user__data-id-icon"
                                        onClick={() => copy.copy(merchantId)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form__inner-container">
                            <div className="form__inner-container-topline">
                                <div className="form__inner-container__item">
                                    <FormInput
                                        label="Merchant name"
                                        placeholder="Company name"
                                        reg={register('merchantName', {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <div className="form__inner-container__item">
                                    <FormInput
                                        label="Website"
                                        placeholder="https://example.com"
                                        reg={register('website', {
                                            pattern: {
                                                value: httpsUrlRegex,
                                                message:
                                                    'Please enter a valid URL',
                                            },
                                        })}
                                    />
                                </div>
                                <div className="form__inner-container__item">
                                    <FormInput
                                        label="Brand"
                                        placeholder="Brand name"
                                        reg={register('brand')}
                                    />
                                </div>
                            </div>
                            <div className="form__inner-container__item">
                                <p className="form__inner-container__item-label">
                                    Description
                                </p>
                                <textarea
                                    placeholder="Few words about merchant"
                                    className="form__inner-container__item-textarea"
                                    {...register('description')}
                                />
                            </div>
                        </div>
                        <div className="form__inner-buttons">
                            <div className="form__inner-buttons-item">
                                {/* add disabled if no changes were made */}
                                <PButton
                                    wide
                                    // disabled={true}
                                    loading={isUpdatingMerchantFields}
                                    children={<p>Save</p>}
                                    onClick={() => console.log('save changes')}
                                />
                            </div>
                            <div
                                className="form__inner-buttons-item form__inner-buttons-item--custom"
                                onClick={() => modalDelete.open()}
                            >
                                Delete merchant
                            </div>
                        </div>
                    </div>
                    <ModalMerchantDelete
                        visible={modalDelete.visible}
                        onClose={() => modalDelete.close()}
                        onDelete={handleMerchantRemoval}
                        merchantName={merchant?.name ?? ''}
                    />
                    <ModalMerchantAvatar
                        isUploading={isLogoUploading}
                        visible={modalAvatar.visible}
                        onSave={(image) => {
                            uploadLogo({ merchant_id: merchantId, image });
                        }}
                        onClose={() => modalAvatar.close()}
                    />
                </form>
            )}
        </>
    );
};
