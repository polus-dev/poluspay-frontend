import { useState } from 'react';
import ReactDOM from 'react-dom';

import { PInput, PModal, PTabs } from '@poluspay-frontend/ui';
import { ReactComponent as IconSearch } from '../../../assets/icons/search.svg';
import { ReactComponent as IconCheckbox } from '../../../assets/icons/checkbox-fill.svg';

import classNames from 'classnames';

import './CurrencySelector.scoped.scss';

interface Asset {
    id: number;
    name: string;
    subname: string;
    image: string;
}

interface ModalProps {
    visible: boolean;
    onClose: (asset: Asset) => void;
}

export const ModalCurrencySelector: React.FC<ModalProps> = ({
    visible,
    onClose,
}) => {
    const [search, setSearch] = useState('');

    const tabs = [
        { id: 'all', text: 'All' },
        { id: 'stable', text: 'Stable coins' },
        { id: 'wrapped', text: 'Wrapped coins' },
        { id: 'native', text: 'Native coins' },
    ];
    const [tab, setTab] = useState(tabs[0]);

    const [selected, setSelected] = useState();

    return ReactDOM.createPortal(
        <>
            <PModal
                visible={visible}
                header={
                    <div className="modal__header">
                        <p className="modal__header-text">
                            Choose payment currency
                        </p>
                    </div>
                }
                body={
                    <div className="modal__body">
                        <div className="modal__search">
                            <PInput
                                placeholder="Search by name"
                                value={search}
                                prepend={
                                    <IconSearch className="modal__search-icon" />
                                }
                                onInput={(value) => setSearch(value.toString())}
                            />
                        </div>
                        <div className="modal__tabs">
                            <div className="modal__tabs-inner">
                                <PTabs
                                    size="sm"
                                    active={tab}
                                    items={tabs}
                                    onChange={(item) => setTab(item)}
                                />
                            </div>
                        </div>
                        <div className="modal__container">
                            <div className="modal__container-inner">
                                <div className="modal__category">
                                    <p className="modal__category-label">
                                        Recently used
                                    </p>
                                    <div className="modal__category-inner">
                                        {/* add dymanic data, replace src/alt, enter the correct asset name */}
                                        {/* add second class only if item selected */}
                                        <div
                                            className={classNames({
                                                'modal__category-inner__item':
                                                    true,
                                                'modal__category-inner__item--active':
                                                    true,
                                            })}
                                        >
                                            <img
                                                className="modal__category-inner__item-image"
                                                src="/images/wallets/polygon.png"
                                                alt="MATIC"
                                            />
                                            <p className="modal__category-inner__item-text">
                                                MATIC
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal__category">
                                    <p className="modal__category-label">
                                        Popular
                                    </p>
                                    <div className="modal__category-inner">
                                        {/* add dymanic data, replace src/alt, enter the correct asset name */}
                                        {/* add second class only if item selected */}
                                        <div
                                            className={classNames({
                                                'modal__category-inner__item':
                                                    true,
                                                'modal__category-inner__item--active':
                                                    false,
                                            })}
                                        >
                                            <img
                                                className="modal__category-inner__item-image"
                                                src="/images/wallets/polygon.png"
                                                alt="MATIC"
                                            />
                                            <p className="modal__category-inner__item-text">
                                                MATIC
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal__list">
                                    <p className="modal__category-label">All</p>
                                    <div className="modal__list-inner">
                                        {/* dynamic data */}
                                        <div className="modal__list-inner__item item">
                                            <div className="item__inner">
                                                <img
                                                    className="item__inner-image"
                                                    src="/images/wallets/polygon.png"
                                                    alt="MATIC"
                                                />
                                                <div className="item__inner-text">
                                                    <p className="item__inner-text-name">
                                                        MATIC
                                                    </p>
                                                    <p className="item__inner-text-fullname">
                                                        MATIC
                                                    </p>
                                                </div>
                                            </div>
                                            {/* second class is added only when item selected */}
                                            <IconCheckbox
                                                className={classNames({
                                                    item__icon: true,
                                                    'item__icon--active': true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                onClose={() =>
                    onClose({
                        id: 1,
                        name: 'MATIC',
                        subname: 'MATIC',
                        image: 'qwe',
                    })
                }
            />
        </>,
        document.body
    );
};
