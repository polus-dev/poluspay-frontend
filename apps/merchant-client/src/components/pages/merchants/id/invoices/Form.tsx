import { useEffect, useMemo, useState } from 'react';

import { useModal } from '../../../../../hooks/useModal';

import {
    FormInput,
    ModalBlockChainSelector,
    ModalCurrencySelector,
    notify,
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
import {
    useCreatePaymentMutation,
    useGetAssetsQuery,
    useGetMerchantWalletQuery,
} from '@poluspay-frontend/merchant-query';
import { getAssetUrl } from '../../../../../../../../tools';
import { blockchainList } from '../../../../ui/Wallets/wallet-list';
import { useGetMerchantIdFromParams } from '../../../../../hooks/useGetMerchantId';
import { useAvailableForMerchantAssets } from '../../../../../hooks/useAvailableForMerchantAssets';

interface Asset {
    id: string;
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
    const [asset, setAsset] = useState<Asset>();
    const [blockchains, setBlockchains] = useState<Blockchain[]>([]);
    const [options, setOptions] = useState<Blockchain[]>([]);
    const [tempAssets, setTempAssets] = useState<any[]>([]);

    const modalCurrency = useModal();
    const modalBlockchains = useModal();
    const modalPreview = useModal();
    const merchantId = useGetMerchantIdFromParams();
    const { assets: data, availableNetworks } =
        useAvailableForMerchantAssets(merchantId);

    const { data: merchantWallets } = useGetMerchantWalletQuery({
        merchant_id: merchantId,
    });

    const [createInvoice, { isLoading: isInvoiceCreating }] =
        useCreatePaymentMutation();

    useEffect(() => {
        if (availableNetworks) {
            const filtered = blockchainList.filter((el) =>
                availableNetworks.some((e) => e.label === el.label)
            );
            setOptions(filtered);
        }
    }, [availableNetworks]);

    const submit: SubmitHandler<InvoiceForm> = async (data) => {
        try {
            if (!(asset && blockchains.length)) {
                notify({
                    title: 'Error',
                    description:
                        'Please select an asset and at least one blockchain',
                    status: 'error',
                });
                return;
            }
            const invoiceAssets = {};
            blockchains.forEach((el) => {
                invoiceAssets[el.label] = {
                    [asset.name]: {
                        amount: data.amount,
                        address: merchantWallets?.find(
                            (wallet) => wallet.network === el.label
                        )?.address,
                    },
                };
            });
            await createInvoice({
                merchant_id: merchantId,
                description: data.description,
                assets: invoiceAssets,
            }).unwrap();
            notify({
                title: 'Success',
                description: 'Invoice created successfully',
                status: 'success',
            });
        } catch (error) {
            notify({
                title: 'Error',
                description: error.message,
                status: 'error',
            });
        }
    };

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
                                        src={asset.image}
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
            {data && availableNetworks && (
                <>
                    <ModalCurrencySelector
                        visible={modalCurrency.visible}
                        onClose={(asset) => {
                            handleModalCurrency(asset);
                            setValue('asset', asset.name);
                        }}
                        categories={data.categories.map((el) => el.name)}
                        assetsForMerchant={data.assets.map((el) => ({
                            name: el.name,
                            image: getAssetUrl(
                                import.meta.env.VITE_REACT_APP_ASSET_URL,
                                el.name
                            ),
                            id: el.name,
                            subname: el.name,
                            category: el.category,
                        }))}
                    />
                    <ModalBlockChainSelector
                        multi
                        visible={modalBlockchains.visible}
                        options={options}
                        setSelected={setBlockchains}
                        selected={blockchains}
                        onClose={() => modalBlockchains.close()}
                    />
                </>
            )}
            <ModalPreviewForm
                visible={modalPreview.visible}
                onClose={() => modalPreview.close()}
            />
        </form>
    );
};
