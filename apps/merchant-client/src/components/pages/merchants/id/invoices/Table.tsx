import classNames from 'classnames';
import './Table.scoped.scss';
import { makeShortHash } from 'tools';

type InvoiceStatus =
    | 'success'
    | 'in_progress'
    | 'pending'
    | 'failed'
    | 'expired';

export interface Invoice {
    id: string;
    amount: string;
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

const openInvoice = (id: string) => {
    window.open(
        `${import.meta.env.VITE_REACT_APP_PAYFORM_URL}?uuid=${id}`,
        '_blank'
    );
};

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
                                {/* TODO: refactor styles */}
                                <p
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => openInvoice(el.id)}
                                    className="table__row-id-text"
                                >
                                    {makeShortHash(el.id, 5)}
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
                                    {el.hash.isSettled
                                        ? makeShortHash(el.hash.value, 3)
                                        : el.hash.value}
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
