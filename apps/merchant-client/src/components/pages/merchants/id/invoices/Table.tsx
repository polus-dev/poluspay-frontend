import { makeShortHash } from 'tools';

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
    amount: string;
    payLink: string;
    currency: string;
    hash: {
        value: string;
        link?: string;
        isSettled: boolean;
    };
    date: string;
    status: InvoiceStatus;
}

interface TableProps {
    invoices: Invoice[];
}

export const MerchantInvoicesTable: React.FC<TableProps> = ({ invoices }) => {
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
                                <a
                                    className="table__row-id-text"
                                    href={el.payLink}
                                    target="_blank"
                                >
                                    {makeShortHash(el.id, 5)}
                                </a>
                            </div>
                            <div className="table__row-amount">
                                <p className="table__row-amount-text">
                                    {el.amount}
                                </p>
                            </div>
                            <div className="table__row-currency">
                                <p className="table__row-currency-text">
                                    {el.currency.toUpperCase()}
                                </p>
                            </div>
                            <div className="table__row-hash">
                                <a
                                    className="table__row-hash-text"
                                    href={el.hash.link}
                                    target="_blank"
                                >
                                    {
                                        el.hash.isSettled
                                            ? makeShortHash(el.hash.value, 3)
                                            : el.hash.value
                                    }
                                </a>
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
                                    {el.status}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
