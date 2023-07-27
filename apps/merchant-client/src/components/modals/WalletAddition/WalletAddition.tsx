import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';

import { PButton, PInput, PModal, PSwitch } from '@poluspay-frontend/ui';
import { ReactComponent as IconChevron } from '../../../assets/icons/chevron.svg';

import './WalletAddition.scoped.scss';
import { Blockchain, placeHolderForAddress, validateAddress } from 'tools';
import { BlockchainItem } from '@poluspay-frontend/ui';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    onImport: (address: string, evm: boolean) => void;
    isEvmChain: boolean;
    selectedBlockchain?: BlockchainItem;
    isLoading: boolean;
}

export const ModalWalletAddition: React.FC<ModalProps> = ({
    visible,
    onClose,
    onImport,
    isEvmChain,
    selectedBlockchain,
    isLoading,
}) => {
    const [address, setAddress] = useState('');
    const [evm, setEvm] = useState(false);
    const [isValidAddress, setValidAddress] = useState(false);

    useEffect(() => {
        if (address && selectedBlockchain) {
            if (validateAddress(address, selectedBlockchain.label)) {
                setValidAddress(true);
            } else {
                setValidAddress(false);
            }
        }
    }, [address]);

    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('click', checkIfClickedOutside);
        return () => {
            setAddress('');
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [onClose]);

    return ReactDOM.createPortal(
        <>
            <PModal
                visible={visible}
                header={
                    <div className="modal__header">
                        <img
                            className="modal__header-image"
                            src={`/images/wallets/${selectedBlockchain?.image}.png`}
                            alt="blockchain name"
                        />
                        <p className="modal__header-text">
                            Connect{' '}
                            {selectedBlockchain &&
                                selectedBlockchain.label
                                    .charAt(0)
                                    .toUpperCase() +
                                    selectedBlockchain.label.slice(1)}
                        </p>
                    </div>
                }
                body={
                    <div ref={ref} className="modal__body">
                        <div className="modal__body-form">
                            <div className="modal__body-form-data">
                                <p className="modal__body-form-data-label">
                                    Public address
                                </p>
                                {!isValidAddress && address.length > 0 && (
                                    <p className="modal__body-form-data-label modal__body-form-data-label--error">
                                        invalid address
                                    </p>
                                )}
                            </div>
                            {/* replace placeholder with dynamic one */}
                            <PInput
                                placeholder={placeHolderForAddress(
                                    selectedBlockchain?.label!
                                )}
                                value={address}
                                onInput={(value) =>
                                    setAddress(value.toString())
                                }
                            />
                        </div>
                        {/* display this only for EVM networks */}
                        {isEvmChain && (
                            <div className="modal__body-switch">
                                <PSwitch
                                    value={evm}
                                    onChange={(value) => setEvm(value)}
                                />
                                <p className="modal__body-switch-text">
                                    Apply the entered address to all EVM
                                    networks: Arbitrum, Ethereum, Polygon,
                                    Optimism, BSC
                                </p>
                            </div>
                        )}
                        <div className="modal__body-buttons">
                            <div className="modal__body-buttons-item">
                                <PButton
                                    wide
                                    outline
                                    children={
                                        <>
                                            Open guide
                                            <IconChevron className="modal__body-buttons-item-icon" />
                                        </>
                                    }
                                    onClick={() => console.log('open guide')}
                                />
                            </div>
                            <div className="modal__body-buttons-item">
                                <PButton
                                    loading={isLoading}
                                    disabled={!isValidAddress}
                                    wide
                                    children={<p>Import</p>}
                                    onClick={() => onImport(address, evm)}
                                />
                            </div>
                        </div>
                    </div>
                }
                onClose={() => {
                  onClose()
                  // TOOD: remove after rework of modal
                  setValidAddress(false)
                }}
            />
        </>,
        document.body
    );
};
