import React from 'react';

import { FormInput, notify, PButton } from '@poluspay-frontend/ui';

import './Form.scoped.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IMerchantForm } from '../Form.interface';
import { useCreateMerchantMutation } from '@poluspay-frontend/merchant-query';

interface FormProps {
    changeStage: () => void;
    setMerchantId: (id: string) => void;
}

export const MerchantForm: React.FC<FormProps> = ({
    changeStage,
    setMerchantId,
}) => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors },
    } = useForm<Omit<IMerchantForm, 'brand'>>();
    const [createMerchant, { isLoading: isCreatingMerchantLoading }] =
        useCreateMerchantMutation();

    // const navigate = useNavigate();

    const submit: SubmitHandler<Omit<IMerchantForm, 'brand'>> = async (
        data
    ) => {
        try {
            const merchant = await createMerchant({
                name: data.merchantName,
                domain: data.website || undefined,
                description: data.description || undefined,
            }).unwrap();
            setMerchantId(merchant.id);
            changeStage();
            // navigate(`/merchants/${merchant.id}/merchant`);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form className="form" onSubmit={handleSubmit(submit)}>
            <div className="form__inner">
                <div className="form__item">
                    <FormInput
                        asterisk
                        placeholder="Company name"
                        label="Merchant name"
                        labelSize="lg"
                        reg={register('merchantName', { required: true })}
                    />
                </div>
                <div className="form__item">
                    <FormInput
                        placeholder="example.com"
                        label="Merchant's website"
                        labelSize="lg"
                        error={errors.website?.message}
                        reg={register('website', {
                            pattern: {
                                value: /\w+\.\w+/,
                                message: 'Invalid domain',
                            },
                        })}
                    />
                </div>
                <div className="form__item">
                    <p className="form__item-label">Description</p>
                    <textarea
                        className="form__item-textarea"
                        placeholder="Few words about merchant"
                        {...register('description')}
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
