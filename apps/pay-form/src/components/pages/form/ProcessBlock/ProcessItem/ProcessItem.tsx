import { StageStatus } from '../../../../../store/features/transaction/transactionSlice';

import { ReactComponent as IconLoading } from '../../../../../assets/icons/loading.svg';
import { ReactComponent as IconCheckmark } from '../../../../../assets/icons/checkmark.svg';
import { ReactComponent as IconCross } from '../../../../../assets/icons/cross.svg';
import { ReactComponent as IconRefresh } from '../../../../../assets/icons/refresh.svg';

import classNames from 'classnames';

import './ProcessItem.scoped.scss';

export type InvoiceStatus = 'pending' | 'loading' | 'success' | 'failure';

interface ProcessItemProps {
    status: StageStatus;
    text: string;
    onRetry: () => void;
}

export const ProcessBlockItem: React.FC<ProcessItemProps> = ({
    status,
    text,
    onRetry,
}) => {
    return (
        <div
            className={classNames({
                item: true,
                'item--pending': status === StageStatus.PENDING,
            })}
        >
            <div className="item__inner">
                <>
                    {status === StageStatus.LOADING ? (
                        <IconLoading className="item__inner-icon item__inner-icon--loading" />
                    ) : status === StageStatus.SUCCESS ? (
                        <IconCheckmark className="item__inner-icon item__inner-icon--success" />
                    ) : (
                        status === StageStatus.FAILURE && (
                            <IconCross className="item__inner-icon item__inner-icon--failure" />
                        )
                    )}
                </>
                <p className="item__inner-text">{text}</p>
            </div>
            {status === StageStatus.FAILURE && (
                <IconRefresh className="item__icon" onClick={onRetry} />
            )}
        </div>
    );
};
