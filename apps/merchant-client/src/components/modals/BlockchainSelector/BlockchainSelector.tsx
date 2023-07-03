import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

import { PModal, PInput, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconSearch } from '../../../assets/icons/search.svg';
import { ReactComponent as IconCheckbox } from '../../../assets/icons/checkbox-fill.svg';

import classNames from 'classnames';

import './BlockchainSelector.scoped.scss';

interface Blockchain {
    id: number;
    name: string;
    image: string;
    [key: string]: string | number;
}

interface ModalProps {
    visible: boolean;
    multi?: boolean;
    hasSearch?: boolean;
    options: Blockchain[];
    onApply: (items: Blockchain[]) => void;
    onClose: () => void;
}

export const ModalBlockChainSelector: React.FC<ModalProps> = ({
    visible,
    multi,
    hasSearch,
    options,
    onApply,
    onClose,
}) => {
    const [search, setSearch] = useState('');

    const [blockchains, setBlockchains] = useState<Blockchain[]>(options);

    const [selected, setSelected] = useState<Blockchain[]>([]);

    const handleSelect = (item: Blockchain) => {
        if (selected.some((el) => el.id === item.id)) {
            const filtered = selected.filter((el) => el.id !== item.id);

            setSelected(filtered);
        } else {
            if (!multi && selected.length > 0) return undefined;

            setSelected([...selected, item]);
        }
    };

    useEffect(() => {
        if (!search) return undefined;

        const filtered = blockchains.filter((el) =>
            el.name.toLowerCase().includes(search.toLocaleLowerCase())
        );

        setBlockchains(filtered);
    }, [search]);

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
                            {blockchains.map((el) => (
                                <div
                                    className="modal__body-container-item"
                                    key={el.id}
                                    onClick={() => handleSelect(el)}
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
                                                selected.some(
                                                    (item) => item.id === el.id
                                                ),
                                        })}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="modal__body-button">
                            <PButton
                                wide
                                children={<>Next</>}
                                onClick={() => onApply(selected)}
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
