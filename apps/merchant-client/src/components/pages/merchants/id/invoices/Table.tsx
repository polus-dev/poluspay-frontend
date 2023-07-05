import classNames from 'classnames';

import './Table.scoped.scss';

type InvoiceStatus =
    | 'success'
    | 'in_progress'
    | 'pending'
    | 'failed'
    | 'expired';

export interface Invoice {
    id: string;
    amount: number;
    currency: string;
    hash: string;
    date: string;
    status: InvoiceStatus;
}

interface TableProps {
    invoices: Invoice[];
}

export const MerchantInvoicesTable: React.FC<TableProps> = ({ invoices }) => {
    const getShortId = (value: string) => {
        return `${value.slice(0, 5)}...${value.slice(-5)}`;
    };

    const getShortHash = (value: string) => {
        return `${value.slice(0, 3)}...${value.slice(-3)}`;
    };

    const normalizeStatus = (status: InvoiceStatus) => {
        return status === 'in_progress'
            ? 'in progress'
            : status
    }

    return (
        <div className="table">
            <div className="table__wrapper">
                <div className="table__row table__row--headline">
                    <div className="table__row-id">ID</div>
                    <div className="table__row-amount">Amount</div>
                    <div className="table__row-currency">Currency</div>
                    <div className="table__row-hash">Hash</div>
                    <div className="table__row-date">Date</div>
                    <div className="table__row-status">Status</div>
                </div>
                <div className="table__container">
                    {invoices.map((el) => (
                        <div className="table__row" key={el.id}>
                            <div className="table__row-id">
                                <p className="table__row-id-text">
                                    {getShortId(el.id)}
                                </p>
                            </div>
                            <div className="table__row-amount">
                                <p className="table__row-amount-text">
                                    {el.amount}
                                </p>
                            </div>
                            <div className="table__row-currency">
                                <p className="table__row-currency-text">
                                    {el.currency}
                                </p>
                            </div>
                            <div className="table__row-hash">
                                <p className="table__row-hash-text">
                                    {getShortHash(el.hash)}
                                </p>
                            </div>
                            <div className="table__row-date">
                                <p className="table__row-date-text">
                                    {el.date}
                                </p>
                            </div>
                            <div className="table__row-status">
                                <p
                                    className={classNames({
                                        'table__row-status-text': true,
                                        [`table__row-status-text--${el.status}`]:
                                            true,
                                    })}
                                >
                                    {normalizeStatus(el.status)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
