import { useState } from 'react';

import { useModal } from '../../../../../hooks/useModal';

import {
    FormInput,
    ModalBlockChainSelector,
    ModalCurrencySelector,
    PButton,
} from '@poluspay-frontend/ui';
import { ModalPreviewForm } from '../../../../../components/modals/PreviewForm/PreviewForm';
import { ReactComponent as IconChevron } from '../../../../../assets/icons/chevron.svg';
import { ReactComponent as IconCross } from '../../../../../assets/icons/cross.svg';

import './Form.scoped.scss';
import {
    FormState,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import { InvoiceForm } from '../../../../../pages/merchants/id/invoices/hooks/form.interface';
import { useGetAssetsQuery } from '@poluspay-frontend/merchant-query';

interface Asset {
    id: number;
    name: string;
    image: string;
}

interface Blockchain {
    id: number;
    name: string;
    image: string;
}

interface MerchantInvoicesFormProps {
    register: UseFormRegister<InvoiceForm>;
    handleSubmit: UseFormHandleSubmit<InvoiceForm>;
    formState: FormState<InvoiceForm>;
    setValue: UseFormSetValue<InvoiceForm>;
}

export const MerchantInvoicesForm = ({
    register,
    handleSubmit,
    formState,
    setValue,
}: MerchantInvoicesFormProps) => {
    const [amount, setAmount] = useState('');
    const [asset, setAsset] = useState<Asset>();
    const [blockchains, setBlockchains] = useState<Blockchain[]>([]);
    const [description, setDescription] = useState('');

    const modalCurrency = useModal();
    const modalBlockchains = useModal();
    const modalPreview = useModal();
    const { data } = useGetAssetsQuery();

    const submit: SubmitHandler<InvoiceForm> = (data) => {};

    const removeSelectedBlockchain = (
        event: React.MouseEvent,
        item: Blockchain
    ) => {
        event?.stopPropagation();

        if (blockchains.some((el) => el.id === item.id)) {
            const filtered = blockchains.filter((el) => el.id !== item.id);

            setBlockchains(filtered);
        }
    };

    const handleModalCurrency = (asset: Asset) => {
        modalCurrency.close();

        setAsset(asset);
    };

    const handleModalBlockchains = (items: Blockchain[]) => {
        modalBlockchains.close();

        setBlockchains(items);
    };

    const blockchainsList = [
        {
            id: 1,
            name: 'polygon',
            image: 'polygon',
        },
        {
            id: 2,
            name: 'polygon',
            image: 'polygon',
        },
        {
            id: 3,
            name: 'polygon',
            image: 'polygon',
        },
        {
            id: 4,
            name: 'polygon',
            image: 'polygon',
        },
        {
            id: 5,
            name: 'polygon',
            image: 'polygon',
        },
        {
            id: 6,
            name: 'polygon',
            image: 'polygon',
        },
        {
            id: 7,
            name: 'polygon',
            image: 'polygon',
        },
        {
            id: 8,
            name: 'polygon',
            image: 'polygon',
        },
    ];

    return (
        <form onSubmit={handleSubmit(submit)} className="form">
            <div className="form__inner">
                <div className="form__inner-item">
                    <FormInput
                        error={formState.errors.amount?.message}
                        reg={register('amount', {
                            required: "Amount can't be empty",
                            minLength: 1,
                        })}
                        label="Amount"
                        placeholder="0"
                        // value={amount}
                        // onInput={(value) => setAmount(value.toString())}
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Asset</p>
                    <div
                        className="form__inner-item-select"
                        onClick={() => modalCurrency.open()}
                    >
                        <div className="form__inner-item-select__inner">
                            {asset ? (
                                <>
                                    <img
                                        className="form__inner-item-select__inner-image"
                                        src={`/images/wallets/${asset.image}.png`}
                                        alt={asset.name}
                                    />
                                    <p className="form__inner-item-select__inner-text">
                                        {asset.name}
                                    </p>
                                </>
                            ) : (
                                <p className="form__inner-item-select__text">
                                    Not selected
                                </p>
                            )}
                        </div>
                        <IconChevron className="form__inner-item-select__icon" />
                    </div>
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Blockchains</p>
                    <div
                        className="form__inner-item-select"
                        onClick={() => modalBlockchains.open()}
                    >
                        <div className="form__inner-item-select__multi multi">
                            {blockchains.length ? (
                                blockchains.map((el) => (
                                    <div
                                        className="multi__item"
                                        key={el.id}
                                        onClick={(event) =>
                                            removeSelectedBlockchain(event, el)
                                        }
                                    >
                                        <img
                                            className="multi__item-image"
                                            src={`/images/wallets/${el.image}.png`}
                                            alt={el.name}
                                        />
                                        <p className="multi__item-text">
                                            {el.name}
                                        </p>
                                        <IconCross className="multi__item-icon" />
                                    </div>
                                ))
                            ) : (
                                <p className="multi__text">Not selected</p>
                            )}
                        </div>
                        <IconChevron className="form__inner-item-select__icon" />
                    </div>
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Description</p>
                    <textarea
                        {...register('description')}
                        placeholder="Few words about invoice"
                        className="form__inner-item-textarea"
                        // value={description}
                        // onInput={() => {}}
                    />
                </div>
                <div className="form__inner-buttons">
                    <div className="form__inner-buttons-item form__inner-buttons-item--mobile">
                        <PButton
                            wide
                            outline
                            children={<p>Preview</p>}
                            onClick={() => modalPreview.open()}
                        />
                    </div>
                    <div className="form__inner-buttons-item">
                        {/* add disabled if no asset/blockchain selected and no amount entered */}
                        <PButton
                            wide
                            children={<p>Create</p>}
                            onClick={() => console.log('qwe')}
                        />
                    </div>
                </div>
            </div>
            <ModalCurrencySelector
                visible={modalCurrency.visible}
                onClose={(asset) => handleModalCurrency(asset)}
            />
            <ModalBlockChainSelector
                multi
                visible={modalBlockchains.visible}
                options={blockchainsList}
                onClose={() => modalBlockchains.close()}
                onApply={(items) => handleModalBlockchains(items)}
            />
            <ModalPreviewForm
                visible={modalPreview.visible}
                onClose={() => modalPreview.close()}
            />
        </form>
    );
};
