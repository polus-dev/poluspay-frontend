import { useEffect, useState } from 'react';

import { useGetInvoices } from './hooks/useGetInvoices';
import { useInvoiceForm } from './hooks/useInvoiceForm';
import { useGetMerchantIdFromParams } from '../../../../hooks/useGetMerchantId';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { PInput, PPagination } from '@poluspay-frontend/ui';
import { MerchantInvoicesForm } from '../../../../components/pages/merchants/id/invoices/Form';
import {
    Invoice,
    MerchantInvoicesTable,
} from '../../../../components/pages/merchants/id/invoices/Table';
import { MerchantInvoicesPreview } from '../../../../components/pages/merchants/id/invoices/Preview';
import { Loader } from '../../../../components/ui/Loader/Loader';
import { ErrorBlock } from '../../../../../../../libs/ui/src/lib/Error/Error';
import { ReactComponent as IconSearch } from '../../../../assets/icons/search.svg';

import './MerchantInvoices.scoped.scss';

export const MerchantInvoicesPage: React.FC = () => {
    const [ref] = useAutoAnimate({ duration: 2000 });
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
        merchantIsNotAvailableToCreateInvoice,
    } = useInvoiceForm(merchantId);

    const { invoices, totalItems, isLoading } = useGetInvoices();

    const limit = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const invoicesPaginated = invoices.slice(
        (currentPage - 1) * limit,
        (currentPage - 1) * limit + limit
    );
    const [filteredInvoices, setFilteredInvoices] = useState<Invoice[] | null>(
        null
    );

    const onPageChange = (value: number) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        if (!search) return undefined;

        const searchLowerCase = search.toLowerCase();

        const filtered = invoices.filter((el) =>
            el.id.includes(searchLowerCase)
        );

        setFilteredInvoices(filtered);
    }, [search]);

    return (
        <div className="invoices">
            {merchantIsNotAvailableToCreateInvoice ? (
                <ErrorBlock title="No connected wallets" />
            ) : (
                <div className="invoices__inner">
                    <h4 className="invoices__inner-title">Create invoice</h4>
                    <div className="invoices__inner-container">
                        <div
                            ref={ref}
                            className="invoices__inner-container-form"
                        >
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
                            <MerchantInvoicesPreview
                                assetUrl={import.meta.env.VITE_ASSET_URL}
                                watch={watch}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="invoices__table">
                <h6 className="invoices__table-title">Invoices</h6>
                {!isLoading && invoicesPaginated.length && (
                    <div className="invoices__table-search">
                        <PInput
                            value={search}
                            placeholder="Search by ID"
                            prepend={
                                <IconSearch className="invoices__table-search-icon" />
                            }
                            onInput={(value) => setSearch(value.toString())}
                        />
                    </div>
                )}
                {isLoading ? (
                    <Loader />
                ) : !invoicesPaginated.length ||
                  (search && !filteredInvoices?.length) ? (
                    <ErrorBlock title="No invoices found" />
                ) : (
                    <div className="invoices__table-container">
                        <MerchantInvoicesTable
                            invoices={
                                search && filteredInvoices?.length
                                    ? filteredInvoices
                                    : invoicesPaginated
                            }
                        />
                    </div>
                )}
                {invoicesPaginated && totalItems > limit && !search && (
                    <div className="invoices__table-pagination">
                        <PPagination
                            current={currentPage}
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
