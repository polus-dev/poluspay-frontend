import type { Invoice } from '../../../../components/pages/merchants/id/invoices/Table';

import { MerchantInvoicesForm } from '../../../../components/pages/merchants/id/invoices/Form';
import { MerchantInvoicesTable } from '../../../../components/pages/merchants/id/invoices/Table';
import { MerchantInvoicesPreview } from '../../../../components/pages/merchants/id/invoices/Preview';

import './MerchantInvoices.scoped.scss';

export const MerchantInvoicesPage: React.FC = () => {
    const invoices: Invoice[] = [
        {
            id: '3894562938741029359',
            amount: 75,
            currency: 'usdc',
            hash: 'dnhgiwuetg8ys0gnb098sue',
            date: '28-05-2023',
            status: 'success',
        },
        {
            id: '38945629387410299',
            amount: 75,
            currency: 'usdc',
            hash: 'dnhgiwuetg8ys0gnb098sue',
            date: '28-05-2023',
            status: 'in_progress',
        },
        {
            id: '389456298741029359',
            amount: 75,
            currency: 'usdc',
            hash: 'dnhgiwuetg8ys0gnb098sue',
            date: '28-05-2023',
            status: 'pending',
        },
        {
            id: '389456293841029359',
            amount: 75,
            currency: 'usdc',
            hash: 'dnhgiwuetg8ys0gnb098sue',
            date: '28-05-2023',
            status: 'failed',
        },
        {
            id: '34562938741029359',
            amount: 75,
            currency: 'usdc',
            hash: 'dnhgiwuetg8ys0gnb098sue',
            date: '28-05-2023',
            status: 'expired',
        },
    ];

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
                <div className="invoices__table-container">
                    <MerchantInvoicesTable invoices={invoices} />
                </div>
            </div>
        </div>
    );
};
