import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';

import { PModal, PInput, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as IconCheckbox } from '../../assets/icons/checkbox-fill.svg';

import classNames from 'classnames';

import './BlockchainSelector.scoped.scss';
import { BlockchainItem } from '../../../list';
import {useOutsideClose} from "@poluspay-frontend/hooks";

interface ModalProps<Multi> {
    visible: boolean;
    multi?: Multi;
    hasSearch?: boolean;
    options: BlockchainItem[];
    next?: (a?: string) => void;
    onClose: () => void;
    selected?: Multi extends true ?  BlockchainItem[] : BlockchainItem;
    setSelected: (items: Multi extends true ?  BlockchainItem[] : BlockchainItem) => void;
    isPayForm?: boolean
}

export const ModalBlockChainSelector = <T extends boolean = false>({
    visible,
    multi,
    hasSearch,
    options,
    onClose,
    setSelected,
    next,
    selected,
  isPayForm
}: ModalProps<T>) => {
    const [search, setSearch] = useState('');
  const ref = useOutsideClose(onClose)
    const [blockchains, setBlockchains] = useState<BlockchainItem[]>(options);

    const handleSelect = (item: BlockchainItem) => {
        if (multi && Array.isArray(selected)) {
            selected.includes(item)
              // @ts-ignore
                ? setSelected(selected.filter((el) => el !== item))
              // @ts-ignore
                : setSelected([...selected, item]);
            return;
        }
      // @ts-ignore
        setSelected(item);
    };

    useEffect(() => {
        setBlockchains(options);
    }, [options]);

    useEffect(() => {
        if (!search) {
            setBlockchains(options);
        } else {
            const filtered = blockchains.filter((el) =>
                el.name.toLowerCase().includes(search.toLowerCase())
            );

            setBlockchains(filtered);
        }
    }, [search]);



    return ReactDOM.createPortal(
        <>
            <PModal
                modalRef={ref}
                visible={visible}
                header={
                    <div className="modal__header">
                        <p className="modal__header-text">
                            Choose {multi ? 'blockchains' : 'blockchain'}
                        </p>
                    </div>
                }
                body={
                    <div className="modal__body">
                        {hasSearch && (
                            <div className="modal__body-search">
                                <PInput
                                    placeholder="Search"
                                    value={search}
                                    prepend={
                                        <IconSearch className="modal__body-search-icon" />
                                    }
                                    onInput={(value) =>
                                        setSearch(value.toString())
                                    }
                                />
                            </div>
                        )}
                        <div className="modal__body-container">
                            {blockchains.length ? (
                                blockchains.map((el) => (
                                    <div
                                        className="modal__body-container-item"
                                        key={el.id}
                                        onClick={() => {
                                            handleSelect(el);
                                        }}
                                    >
                                        <div className="modal__body-container-item__inner">
                                            <img
                                                className="modal__body-container-item__inner-image"
                                                src={`/${isPayForm ? "images" : "images/wallets"}/${el.image}.png`}
                                                alt={el.name}
                                            />
                                            <p className="modal__body-container-item__inner-name">
                                                {el.name}
                                            </p>
                                        </div>
                                        <IconCheckbox
                                            className={classNames({
                                                'modal__body-container-item__icon':
                                                    true,
                                                'modal__body-container-item__icon--active':
                                                    multi && Array.isArray(selected)
                                                        ? selected.includes(el)
                                                        : selected === el,
                                            })}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="modal__body-container-item">
                                    <p className="modal__body-container-item__inner-name">
                                        No results
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="modal__body-button">
                            <PButton
                                wide
                                children={<>Next</>}
                                onClick={() => next ? next() : onClose()}
                            />
                        </div>
                    </div>
                }
                onClose={onClose}
            />
        </>,
        document.querySelector("#modal-root")!
    );
};
