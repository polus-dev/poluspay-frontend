import React, { useState } from 'react';

import { PButton, PInput } from '@poluspay-frontend/ui';

import './Form.scoped.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IMerchantForm } from '../Form.interface';
import { useCreateMerchantMutation } from '@poluspay-frontend/merchant-query';
import { useNavigate } from 'react-router-dom';
import { httpsUrlRegex } from 'tools';

interface FormProps {
    changeStage: () => void;
}

export const MerchantForm: React.FC<FormProps> = ({ changeStage }) => {
    const {
        register,
        handleSubmit,
        formState: { isValid },
    } = useForm<Omit<IMerchantForm, 'brand'>>();
    const [createMerchant, { isLoading: isCreatingMerchantLoading }] =
        useCreateMerchantMutation();

    const navigate = useNavigate();

    const submit: SubmitHandler<Omit<IMerchantForm, 'brand'>> = async (
        data
    ) => {
        try {
            const merchant = await createMerchant({
                name: data.merchantName,
                domain: data.website,
                description: data.description,
            }).unwrap();
            navigate(`/merchants/${merchant.id}/merchant`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form onSubmit={handleSubmit(submit)} className="form">
            <div className="form__inner">
                <div className="form__item">
                    <p className="form__item-label">
                        Merchant name&nbsp;&nbsp;
                        <span className="form__item-label form__item-label--required">
                            *
                        </span>
                    </p>
                    <PInput
                        reg={register('merchantName', { required: true })}
                        placeholder="Company name"
                    />
                </div>
                <div className="form__item">
                    <p className="form__item-label">Merchant's website</p>
                    <PInput
                        reg={register('website')}
                        placeholder="example.com"
                    />
                </div>
                <div className="form__item">
                    <p className="form__item-label">Description</p>
                    <textarea
                        {...register('description')}
                        className="form__item-textarea"
                        placeholder="Few words about merchant"
                    />
                </div>
            </div>
            <div className="form__button">
                <PButton
                    wide
                    loading={isCreatingMerchantLoading}
                    disabled={!isValid}
                    classname="form__button"
                    children={<p>Continue</p>}
                    // onClick={() => changeStage()}
                />
            </div>
            <div className="form__button form__button--desktop">
                <PButton
                    wide
                    loading={isCreatingMerchantLoading}
                    disabled={!isValid}
                    size="lg"
                    classname="form__button form__button--desktop"
                    children={<p>Continue</p>}
                    // onClick={() => changeStage()}
                />
            </div>
        </form>
    );
};
