import { useState } from 'react';

import { PPagination } from '@poluspay-frontend/ui';
import { MerchantInvoicesForm } from '../../../../components/pages/merchants/id/invoices/Form';
import { MerchantInvoicesTable } from '../../../../components/pages/merchants/id/invoices/Table';
import { MerchantInvoicesPreview } from '../../../../components/pages/merchants/id/invoices/Preview';
import { Loader } from '../../../../components/ui/Loader/Loader';
import { ErrorBlock } from '../../../../components/ui/Error/Error';

import './MerchantInvoices.scoped.scss';
import { useGetPaginatedInvoices } from './hooks/useGetPaginatedInvoices';
import { useInvoiceForm } from './hooks/useInvoiceForm';
import { useGetMerchantIdFromParams } from '../../../../hooks/useGetMerchantId';
import {useAutoAnimate} from "@formkit/auto-animate/react";

export const MerchantInvoicesPage: React.FC = () => {
    const [current, setCurrent] = useState(1);
    const limit = 10;
    const merchantId = useGetMerchantIdFromParams();
    const {
        register,
        handleSubmit,
        watch,
        availableAssetNetworks,
        availableMerchantAssets,
        selectedAsset,
        selectedNetworks,
        setSelectedNetworks,
        setSelectedAsset,
      availableCategories,
      formState,
      showPreviewForm,
      merchantIsNotAvailableToCreateInvoice
    } = useInvoiceForm(merchantId);

    const [ref] = useAutoAnimate({duration: 2000});

    const {
        invoices: invoicesPaginated,
        totalItems,
        isLoading,
    } = useGetPaginatedInvoices({
        limit,
        current,
    });

    const onPageChange = (value: number) => {
        setCurrent(value);
    };

  return (
        <div  className="invoices">
          {merchantIsNotAvailableToCreateInvoice ? <ErrorBlock title="connected wallet list empty"/> : (<div className="invoices__inner">
                <h4 className="invoices__inner-title">Create invoice</h4>
                <div className="invoices__inner-container">
                    <div ref={ref} className="invoices__inner-container-form">
                        <MerchantInvoicesForm
                            formState={formState}
                            register={register}
                            availableAssets={availableMerchantAssets}
                            availableNetworks={availableAssetNetworks}
                            categories={availableCategories}
                            selectedAsset={selectedAsset!}
                            selectedNetworks={selectedNetworks}
                            setSelectedAsset={setSelectedAsset}
                            setSelectedNetworks={setSelectedNetworks}
                            onSubmit={handleSubmit}
                        />
                    </div>
                   <div className="invoices__inner-container-preview">
                        <MerchantInvoicesPreview assetUrl={import.meta.env.VITE_REACT_APP_ASSET_URL} watch={watch} />
                    </div>
                </div>
            </div> )}
            <div className="invoices__table">
                <h6 className="invoices__table-title">Invoices</h6>
                {isLoading ? (
                    <Loader />
                ) : !invoicesPaginated.length ? (
                    <ErrorBlock title="No invoices found" />
                ) : (
                    <div className="invoices__table-container">
                        <MerchantInvoicesTable invoices={invoicesPaginated} />
                    </div>
                )}
                {invoicesPaginated && totalItems > limit && (
                    <div className="invoices__table-pagination">
                        <PPagination
                            current={current}
                            totalItems={totalItems}
                            pageItems={limit}
                            onPageChange={(value) => onPageChange(value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
