import ReactDOM from 'react-dom';
import React, { useEffect, useRef, useState } from 'react';
import type { Blockchain as Label } from 'tools';

import { PModal, PInput, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as IconCheckbox } from '../../assets/icons/checkbox-fill.svg';

import classNames from 'classnames';

import './BlockchainSelector.scoped.scss';

interface Blockchain {
    id: number;
    name: string;
    image: string;
    label: Label;
}

interface ModalProps {
    visible: boolean;
    multi?: boolean;
    hasSearch?: boolean;
    options: Blockchain[];
    // onApply: (items: Blockchain[]) => void;
    onClose: () => void;
    selected?: Label;
    setSelected: (items: Label) => void;
}

export const ModalBlockChainSelector: React.FC<ModalProps> = ({
    visible,
    multi,
    hasSearch,
    options,
    onClose,
    setSelected,
    selected,
}) => {
    const [search, setSearch] = useState('');

    const [blockchains, setBlockchains] = useState<Blockchain[]>(options);

    const handleSelect = (item: Blockchain) => {
        setSelected(item.label);
    };

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

    // make close on click outside
    // make close on esc
    //
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('click', checkIfClickedOutside);
        return () => {
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <PModal
                visible={visible}
                header={
                    <div className="modal__header">
                        <p className="modal__header-text">
                            Choose {multi ? 'blockchains' : 'blockchain'}
                        </p>
                    </div>
                }
                body={
                    <div ref={ref} className="modal__body">
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
                                            console.log('item', el);
                                            handleSelect(el);
                                        }}
                                    >
                                        <div className="modal__body-container-item__inner">
                                            <img
                                                className="modal__body-container-item__inner-image"
                                                src={`/images/wallets/${el.image}.png`}
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
                                                    selected === el.label,
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
                        {/* <div className="modal__body-button">
                            <PButton
                                wide
                                children={<>Next</>}
                                onClick={() => onApply(selected)}
                            />
                        </div>
                        */}
                    </div>
                }
                onClose={onClose}
            />
        </>,
        document.body
    );
};
