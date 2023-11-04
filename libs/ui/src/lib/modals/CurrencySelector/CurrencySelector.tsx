import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { AssetRepresentation } from '@poluspay-frontend/api';
import { useOutsideClose } from '@poluspay-frontend/hooks';
import { getAssetUrl } from '@poluspay-frontend/utils';
import { TOKENS_TO_EXCLUDE } from '@poluspay-frontend/api';

import { PButton, PInput, PModal, PTabs } from '@poluspay-frontend/ui';
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as IconCheckbox } from '../../assets/icons/checkbox-fill.svg';

import classNames from 'classnames';

import './CurrencySelector.scoped.scss';

interface ModalProps {
    visible: boolean;
    assetsRepresentation: AssetRepresentation[];
    categories: string[];
    assetUrl: string;
    onClose: (asset?: AssetRepresentation) => void;
}

export const ModalCurrencySelector: React.FC<ModalProps> = ({
    visible,
    categories,
    assetsRepresentation,
    assetUrl,
    onClose,
}) => {
    const ref = useOutsideClose(onClose);

    const filteredTokens = assetsRepresentation.filter(
        (token) => !TOKENS_TO_EXCLUDE.includes(token.name)
    );

    const categoriesTabs = categories
        .map((category) => ({
            id: category,
            text: category,
        }))
        .filter((el) => el.id !== 'all' && el.text !== 'All');

    const tabs = [{ id: 'all', text: 'All' }, ...categoriesTabs];

    const [tab, setTab] = useState(tabs[0]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<AssetRepresentation>();
    const [assets, setAssets] = useState(filteredTokens);

    useEffect(() => {
        if (search.length > 0) {
            setAssets(
                filteredTokens.filter((asset) =>
                    asset.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setAssets(filteredTokens);
        }
    }, [search]);

    useEffect(() => {
        if (tab.id === 'all') {
            setAssets(filteredTokens);
        } else {
            setAssets(
                filteredTokens.filter((asset) =>
                    asset.categories.includes(tab.id)
                )
            );
        }
    }, [tab, assetsRepresentation]);

    return ReactDOM.createPortal(
        <>
            <PModal
                modalRef={ref}
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
                                <div className="modal__list">
                                    <p className="modal__category-label">All</p>
                                    <div className="modal__list-inner">
                                        {assets.length ? (
                                            assets.map((asset) => (
                                                <div
                                                    className="modal__list-inner__item item"
                                                    key={asset.name}
                                                    onClick={() =>
                                                        setSelected(asset)
                                                    }
                                                >
                                                    <div className="item__inner">
                                                        <img
                                                            className="item__inner-image"
                                                            src={getAssetUrl(
                                                                assetUrl,
                                                                asset.name
                                                            )}
                                                            alt="MATIC"
                                                        />
                                                        <div className="item__inner-text">
                                                            <p className="item__inner-text-name">
                                                                {asset.name}
                                                            </p>
                                                            <p className="item__inner-text-fullname">
                                                                {asset.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <IconCheckbox
                                                        className={classNames({
                                                            item__icon: true,
                                                            'item__icon--active':
                                                                asset ===
                                                                selected,
                                                        })}
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="modal__list-inner__item item">
                                                No assets found
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal__button">
                            <PButton
                                wide
                                disabled={!selected}
                                children={<p>Continue</p>}
                                onClick={() => onClose(selected)}
                            />
                        </div>
                    </div>
                }
                onClose={() => onClose(selected)}
            />
        </>,
        document.querySelector('#modal-root')!
    );
};
