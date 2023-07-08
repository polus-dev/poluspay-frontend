import { useState } from 'react';

import { PPagination } from '@poluspay-frontend/ui';
import { MerchantInvoicesForm } from '../../../../components/pages/merchants/id/invoices/Form';
import { MerchantInvoicesTable } from '../../../../components/pages/merchants/id/invoices/Table';
import { MerchantInvoicesPreview } from '../../../../components/pages/merchants/id/invoices/Preview';
import { Loader } from '../../../../components/ui/Loader/Loader';
import { ErrorBlock } from '../../../../components/ui/Error/Error';

import './MerchantInvoices.scoped.scss';
import { useGetPaginatedInvoices } from './hooks/useGetPaginatedInvoices';

export const MerchantInvoicesPage: React.FC = () => {
    const [current, setCurrent] = useState(1);
    const limit = 10;

    // replace with actual data
    const loading = false

    const { invoices: invoicesPaginated, totalItems } = useGetPaginatedInvoices(
        {
            limit,
            current,
        }
    );

    const onPageChange = (value: number) => {
        setCurrent(value);
    };

    return (
        <div className="invoices">
            <div className="invoices__inner">
                <h4 className="invoices__inner-title">Create invoice</h4>
                <div className="invoices__inner-container">
                    <div className="invoices__inner-container-form">
                        <MerchantInvoicesForm />
                    </div>
                    <div className="invoices__inner-container-preview">
                        <MerchantInvoicesPreview />
                    </div>
                </div>
            </div>
            <div className="invoices__table">
                <h6 className="invoices__table-title">Invoices</h6>
                {loading ? (
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
