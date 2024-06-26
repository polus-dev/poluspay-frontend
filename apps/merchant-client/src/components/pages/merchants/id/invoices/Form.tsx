import type { InvoiceForm } from '../../../../../pages/merchants/id/invoices/hooks/form.interface';
import type { BlockchainItem } from '@poluspay-frontend/ui';
import type { AssetRepresentation } from '@poluspay-frontend/api';

import { FormState, UseFormRegister } from 'react-hook-form';

import { useModal } from '@poluspay-frontend/hooks';
import { getAssetUrl } from '@poluspay-frontend/utils';

import {
    FormInput,
    ModalBlockChainSelector,
    ModalCurrencySelector,
    PButton,
} from '@poluspay-frontend/ui';
import { ModalPreviewForm } from '../../../../modals/PreviewForm/PreviewForm';
import { ReactComponent as IconChevron } from '../../../../../assets/icons/chevron.svg';
import { ReactComponent as IconCross } from '../../../../../assets/icons/cross.svg';

import './Form.scoped.scss';

interface MerchantInvoicesFormProps {
    formState: FormState<InvoiceForm>;
    availableAssets: AssetRepresentation[];
    selectedAsset: AssetRepresentation;
    selectedNetworks: BlockchainItem[];
    availableNetworks: BlockchainItem[];
    categories: string[];
    register: UseFormRegister<InvoiceForm>;
    onSubmit: () => void;
    setSelectedAsset: React.Dispatch<
        React.SetStateAction<AssetRepresentation | null>
    >;
    setSelectedNetworks: React.Dispatch<React.SetStateAction<BlockchainItem[]>>;
}

export const MerchantInvoicesForm = ({
    formState,
    selectedAsset,
    availableAssets,
    availableNetworks,
    selectedNetworks,
    categories,
    register,
    onSubmit,
    setSelectedNetworks,
    setSelectedAsset,
}: MerchantInvoicesFormProps) => {
    const modalCurrency = useModal();
    const modalBlockchains = useModal();
    const modalPreview = useModal();

    const removeSelectedBlockchain = (
        event: React.MouseEvent,
        item: BlockchainItem
    ) => {
        event?.stopPropagation();

        if (selectedNetworks.some((el) => el.id === item.id)) {
            const filtered = selectedNetworks.filter((el) => el.id !== item.id);

            setSelectedNetworks(filtered);
        }
    };

    const handleModalCurrency = (asset?: AssetRepresentation) => {
        if (asset) setSelectedAsset(asset);

        modalCurrency.close();
    };

    return (
        <form onSubmit={onSubmit} className="form">
            <div className="form__inner">
                <div className="form__inner-item">
                    <FormInput
                        error={formState.errors.amount?.message}
                        reg={register('amount', {
                            required: "Amount can't be empty",
                            minLength: 1,
                        })}
                        type="number"
                        label="Amount"
                        placeholder="0"
                    />
                </div>
                <div className="form__inner-item">
                    <p className="form__inner-item-label">Asset</p>
                    <div
                        className="form__inner-item-select"
                        onClick={() => modalCurrency.open()}
                    >
                        <div className="form__inner-item-select__inner">
                            {selectedAsset ? (
                                <>
                                    <img
                                        className="form__inner-item-select__inner-image"
                                        src={getAssetUrl(
                                            import.meta.env.VITE_ASSET_URL,
                                            selectedAsset.name
                                        )}
                                        alt={selectedAsset.name}
                                    />
                                    <p className="form__inner-item-select__inner-text">
                                        {selectedAsset.name}
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
                            {selectedNetworks.length ? (
                                selectedNetworks.map((el) => (
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
                    <div className="form__inner-item-data">
                        <p className="form__inner-item-label">Description</p>
                        {formState.errors.description && (
                            <p className="form__inner-item-label form__inner-item-label--error">
                                {formState.errors.description.message}
                            </p>
                        )}
                    </div>
                    <textarea
                        placeholder="Few words about invoice"
                        className="form__inner-item-textarea invisible-scroll"
                        {...register('description', {
                            maxLength: {
                                message: 'Description is too long',
                                value: 100,
                            },
                        })}
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
            {availableNetworks && (
                <>
                    <ModalCurrencySelector
                        visible={modalCurrency.visible}
                        onClose={handleModalCurrency}
                        categories={categories}
                        assetsRepresentation={availableAssets}
                        assetUrl={import.meta.env.VITE_ASSET_URL}
                    />
                    <ModalBlockChainSelector
                        multi
                        visible={modalBlockchains.visible}
                        options={availableNetworks}
                        setSelected={setSelectedNetworks}
                        selected={selectedNetworks}
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
