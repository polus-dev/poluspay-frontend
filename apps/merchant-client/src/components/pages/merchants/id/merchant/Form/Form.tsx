import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useModal } from '../../../../../../hooks/useModal';

import { PButton, PInput } from '@poluspay-frontend/ui';
import { MerchantProfileAvatar } from './Avatar';
import { ModalMerchantDelete } from '../../../../../modals/MerchantDelete/MerchantDelete';
import { ReactComponent as IconCopy } from '../../../../../../assets/icons/copy.svg';
import {
    useDeleteMerchantMutation,
    useGetMerchantByIdQuery,
    useUpdateMerchantFieldsMutation,
} from '@poluspay-frontend/merchant-query';

import classNames from 'classnames';

import './Form.scoped.scss';

import { useNavigate, useParams } from 'react-router-dom';
import { IMerchantForm } from './Form.interface';

export const MerchantProfileForm: React.FC = () => {
    const modalDelete = useModal();
    const modalAvatar = useModal();

    const { id: merchantId } = useParams();

    if (!merchantId) {
        return <></>;
    }

    const [deleteMerchant, { isLoading: isDeleteMerchantLoading }] =
        useDeleteMerchantMutation();
    const [updateMerchantFields, { isLoading: isUpdatingMerchantFields }] =
        useUpdateMerchantFieldsMutation();
    const { data: merchant, isLoading: isGetMerchantByIdLoading } =
        useGetMerchantByIdQuery({ merchant_id: merchantId });

    const { register, handleSubmit, reset } = useForm<IMerchantForm>();
    useEffect(() => {
        if (merchant) {
            reset({
                website: merchant.domain,
                description: merchant.description,
                merchantName: merchant.name,
            });
        }
    }, [merchant]);

    const [copied, setCopied] = useState(false);

    const getShortMerchantId = () => {
        return `${merchantId.slice(0, 8)}...${merchantId.slice(-8)}`;
    };

    const copyId = () => {
        if (copied) return undefined;

        navigator.clipboard.writeText(merchantId);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
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
            }).unwrap();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="form">
            <h4 className="form__title">Merchant</h4>
            <div className="form__inner">
                <div className="form__inner-user">
                    <div className="form__inner-user__avatar">
                        <MerchantProfileAvatar
                            openModal={() => console.log('open modal')}
                        />
                    </div>
                    <div className="form__inner-user__data">
                        <p className="form__inner-user__data-name">
                            Merchant name
                        </p>
                        <div className="form__inner-user__data-id">
                            <p
                                className={classNames({
                                    'form__inner-user__data-id-value': true,
                                    'form__inner-user__data-id-value--blue':
                                        copied,
                                })}
                            >
                                {copied ? 'Copied!' : getShortMerchantId()}
                            </p>
                            <p
                                className={classNames({
                                    'form__inner-user__data-id-value': true,
                                    'form__inner-user__data-id-value--blue':
                                        copied,
                                    'form__inner-user__data-id-value--desktop':
                                        true,
                                })}
                            >
                                {copied ? 'Copied!' : merchantId}
                            </p>
                            <IconCopy
                                className="form__inner-user__data-id-icon"
                                onClick={copyId}
                            />
                        </div>
                    </div>
                </div>
                <div className="form__inner-container">
                    <div className="form__inner-container-topline">
                        <div className="form__inner-container__item">
                            <p className="form__inner-container__item-label">
                                Merchant name
                            </p>
                            {/* <input {...register('merchantName')} /> */}
                            <PInput
                                reg={register('merchantName')}
                                placeholder="Company name"
                                type="text"
                            />
                        </div>
                        <div className="form__inner-container__item">
                            <p className="form__inner-container__item-label">
                                Website
                            </p>
                            <PInput
                                placeholder="https://example.com"
                                reg={register('website')}
                            />
                        </div>
                        <div className="form__inner-container__item">
                            <p className="form__inner-container__item-label">
                                Brand
                            </p>

                            <PInput
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
        </form>
    );
};
