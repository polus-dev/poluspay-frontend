import {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import { PInput, PModal, PTabs } from '@poluspay-frontend/ui';
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as IconCheckbox } from '../../assets/icons/checkbox-fill.svg';

import classNames from 'classnames';

import './CurrencySelector.scoped.scss';
import { category } from 'fp-ts';
import {AssetRepresentation} from "@poluspay-frontend/api";
import {getAssetUrl} from "../../../../../../tools";
import {useOutsideClose} from "@poluspay-frontend/hooks";

interface Asset {
    id: string;
    name: string;
    subname: string;
    image: string;
    category: string[];
}

interface ModalProps {
    visible: boolean;
    assetsForMerchant: AssetRepresentation[];
    categories: string[];
    onClose: (asset?: AssetRepresentation) => void;
    assetUrl: string;
}

export const ModalCurrencySelector: React.FC<ModalProps> = ({
    visible,
    onClose,
    categories,
    assetsForMerchant,
    assetUrl
}) => {
    const [search, setSearch] = useState('');

    const tabs = [
        { id: 'All', text: 'All' },
        ...categories.map((category) => ({
            id: category,
            text: category,
        })),
    ];

    const [tab, setTab] = useState(tabs[0]);
    const ref = useOutsideClose(onClose)

    const [selected, setSelected] = useState<AssetRepresentation>();
    const [assets, setAssets] = useState(assetsForMerchant);

    useEffect(() => {
        if (search.length > 0) {
            setAssets(
                assetsForMerchant.filter((asset) =>
                    asset.name.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setAssets(assetsForMerchant);
        }
    }, [search]);

    useEffect(() => {
        if (tab.id === 'All') {
            setAssets(assetsForMerchant);
        } else {
            setAssets(
                assetsForMerchant.filter((asset) =>
                    asset.categories.includes(tab.id)
                )
            );
        }
    }, [tab, assetsForMerchant]);


    return ReactDOM.createPortal(
        <>
            <PModal
              modalRef={ref}
                visible={visible}
                header={
                    <div  className="modal__header">
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
                                                    onClick={() =>
                                                        setSelected(asset)
                                                    }
                                                    className="modal__list-inner__item item"
                                                >
                                                    <div className="item__inner">
                                                        <img
                                                            className="item__inner-image"
                                                            src={getAssetUrl(assetUrl, asset.name)}
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
                                                    {/* second class is added only when item selected */}
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
                    </div>
                }
                onClose={() => onClose(selected)}
            />
        </>,
  document.querySelector("#modal-root")!
    );
};
