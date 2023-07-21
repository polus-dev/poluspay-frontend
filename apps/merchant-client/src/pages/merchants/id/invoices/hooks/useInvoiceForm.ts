import { SubmitHandler, useForm } from 'react-hook-form';
import { InvoiceForm } from './form.interface';
import {
    useCreatePaymentMutation,
    useGetAssetsQuery,
    useGetMerchantWalletQuery,
} from '@poluspay-frontend/merchant-query';
import { useEffect, useState } from 'react';
import { AssetRepresentation } from '@poluspay-frontend/api';
import {
    BlockchainItem,
    blockchainList,
} from '../../../../../components/ui/Wallets/wallet-list';
import { notify } from '@poluspay-frontend/ui';

export const useInvoiceForm = (merchantId: string) => {
    const { handleSubmit, watch, register, formState, setValue } =
        useForm<InvoiceForm>();
    const { data: assets } = useGetAssetsQuery();

    const [availableMerchantAssets, setAvailableMerchantAssets] = useState<
        AssetRepresentation[]
    >([]);
    const [showPreviewForm, setShowPreviewForm] = useState(false);
    const [availableAssetNetworks, setAvailableAssetNetworks] = useState<
        BlockchainItem[]
    >([]);
    const [selectedAsset, setSelectedAsset] =
        useState<AssetRepresentation | null>(null);
    const [selectedNetworks, setSelectedNetworks] = useState<BlockchainItem[]>(
        []
    );
    const [availableCategories, setAvailableCategories] = useState<string[]>(
        []
    );
    const [
        merchantIsNotAvailableToCreateInvoice,
        setMerchantIsNotAvailableToCreateInvoice,
    ] = useState(false);
    const [createInvoice, { isLoading: isCreateInvoiceLoading }] =
        useCreatePaymentMutation();

    const { data: merchantWallets } = useGetMerchantWalletQuery({
        merchant_id: merchantId,
    });

    useEffect(() => {
        if (merchantWallets && assets) {
            if (merchantWallets.length === 0) {
                setMerchantIsNotAvailableToCreateInvoice(true);
                return;
            }
            const availableNetworks = [
                ...new Set(merchantWallets.map((e) => e.network)),
            ];
            const [availableAssets, availableCategories] = assets.getAssetsByNetworks(
                availableNetworks,
            );
            setAvailableMerchantAssets(availableAssets);
            setAvailableCategories(availableCategories);
        }
    }, [merchantWallets, assets]);

    useEffect(() => {
        if (selectedAsset) {
            setAvailableAssetNetworks(
                selectedAsset.networks.map(
                    (e) => blockchainList.find((b) => b.label === e)!
                )
            );
            setSelectedNetworks([]);
            setShowPreviewForm(false);
        }
    }, [selectedAsset]);

    useEffect(() => {
        if (selectedNetworks.length > 0 && selectedAsset) {
            setValue('currency', selectedAsset.name);
            setValue('blockchain', selectedNetworks[0].label);
            setShowPreviewForm(true);
        }
    }, [selectedNetworks, selectedAsset]);

    const submit: SubmitHandler<InvoiceForm> = async (data) => {
        try {
            if (!selectedAsset) {
                notify({
                    title: 'Error',
                    description: 'Please select an asset',
                    status: 'error',
                });
                return;
            }
            const invoiceAssets: any = {};
            selectedNetworks.forEach((el) => {
                invoiceAssets[el.label] = {
                    [selectedAsset.name]: {
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
            console.error(error);
        }
    };

    const onSubmit = handleSubmit(submit);
    return {
        formState,
        handleSubmit: onSubmit,
        watch,
        register,
        selectedAsset,
        selectedNetworks,
        setSelectedAsset,
        setSelectedNetworks,
        availableMerchantAssets,
        availableAssetNetworks,
        assets,
        availableCategories,
        showPreviewForm,
        merchantIsNotAvailableToCreateInvoice,
        isCreateInvoiceLoading,
    };
};
