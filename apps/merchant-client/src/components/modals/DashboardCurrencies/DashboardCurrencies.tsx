import type { FilledBar } from '../../pages/dashboard/FilledBar/FilledBar';

import ReactDom from 'react-dom';
import { useState } from 'react';

import { PButton, PModal, PPagination } from '@poluspay-frontend/ui';
import { DashboardFilledBar } from '../../pages/dashboard/FilledBar/FilledBar';

import './DashboardCurrencies.scoped.scss';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

export const ModalDashboardCurrencies: React.FC<ModalProps> = ({
    visible,
    onClose,
}) => {
    const data: FilledBar[] = [
        { label: 'BNB', value: '$125000', color: '#FCAD1E', fill: 100 },
        { label: 'Ethereum', value: '$125000', color: '#FAF305', fill: 65 },
        { label: 'MATIC', value: '$125000', color: '#1B9628', fill: 54 },
        { label: 'USDT', value: '$125000', color: '#39E849', fill: 32 },
        { label: 'PLS', value: '$125000', color: '#A5EAAC', fill: 12 },
        { label: 'BNB1', value: '$125000', color: '#FCAD1E', fill: 100 },
        { label: 'Ethereum1', value: '$125000', color: '#FAF305', fill: 65 },
        { label: 'MATIC1', value: '$125000', color: '#1B9628', fill: 54 },
        { label: 'USDT1', value: '$125000', color: '#39E849', fill: 32 },
        { label: 'PLS1', value: '$125000', color: '#A5EAAC', fill: 12 },
        { label: 'BNB2', value: '$125000', color: '#FCAD1E', fill: 100 },
        { label: 'Ethereum2', value: '$125000', color: '#FAF305', fill: 65 },
        { label: 'MATIC2', value: '$125000', color: '#1B9628', fill: 54 },
        { label: 'USDT2', value: '$125000', color: '#39E849', fill: 32 },
        { label: 'PLS2', value: '$125000', color: '#A5EAAC', fill: 12 },
        { label: 'BNB3', value: '$125000', color: '#FCAD1E', fill: 100 },
        { label: 'Ethereum3', value: '$125000', color: '#FAF305', fill: 65 },
        { label: 'MATIC3', value: '$125000', color: '#1B9628', fill: 54 },
        { label: 'USDT3', value: '$125000', color: '#39E849', fill: 32 },
        { label: 'PLS3', value: '$125000', color: '#A5EAAC', fill: 12 },
    ];

    const limit = window.innerWidth >= 480 ? 16 : 8;
    const [currentPage, setCurrentPage] = useState(1);
    const dataPaginated = data.slice(
        (currentPage - 1) * limit,
        (currentPage - 1) * limit + limit
    );

    const onPageChange = (value: number) => {
        setCurrentPage(value);
    };

    return ReactDom.createPortal(
        <>
            <PModal
                visible={visible}
                closable={false}
                header={
                    <div className="modal__header">
                        <p className="modal__header-title">Other currencies</p>
                    </div>
                }
                body={
                    <div className="modal__body">
                        <div className="modal__body-container">
                            {dataPaginated.map((item) => (
                                <div
                                    className="modal__body-container-item"
                                    key={item.label}
                                >
                                    <DashboardFilledBar
                                        item={item}
                                        onClick={() => {}}
                                    />
                                </div>
                            ))}
                        </div>
                        {data.length > limit && (
                            <div className="modal__body-pagination">
                                <PPagination
                                    current={currentPage}
                                    pageItems={limit}
                                    totalItems={data.length}
                                    onPageChange={(page) => onPageChange(page)}
                                />
                            </div>
                        )}
                        <div className="modal__body-button">
                            <PButton
                                wide
                                children={<p>Back</p>}
                                onClick={onClose}
                            />
                        </div>
                    </div>
                }
                onClose={onClose}
            />
        </>,
        document.body
    );
};
