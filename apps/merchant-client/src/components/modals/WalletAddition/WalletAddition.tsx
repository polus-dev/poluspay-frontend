import ReactDOM from 'react-dom';
import { useState } from 'react';

import { PButton, PInput, PModal, PSwitch } from '@poluspay-frontend/ui';
import { ReactComponent as IconChevron } from '../../../assets/icons/chevron.svg';

import './WalletAddition.scoped.scss';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
    onImport: (address: string) => void;
}

export const ModalWalletAddition: React.FC<ModalProps> = ({
    visible,
    onClose,
    onImport,
}) => {
    const [address, setAddress] = useState('');
    const [evm, setEvm] = useState(true);

    return ReactDOM.createPortal(
        <>
            <PModal
                visible={visible}
                header={
                    <div className="modal__header">
                        {/* replace src and  name with dynamic ones */}
                        <img
                            className="modal__header-image"
                            src="/images/wallets/polygon.png"
                            alt="blockchain name"
                        />
                        {/* replace with dynamic */}
                        <p className="modal__header-text">Connect Polygon</p>
                    </div>
                }
                body={
                    <div className="modal__body">
                        <div className="modal__body-form">
                            <div className="modal__body-form-data">
                                <p className="modal__body-form-data-label">
                                    Public address
                                </p>
                                {/* replace with errors after address validation */}
                                <p className="modal__body-form-data-label modal__body-form-data-label--error">
                                    errors
                                </p>
                            </div>
                            {/* replace placeholder with dynamic one */}
                            <PInput
                                placeholder="0x..."
                                value={address}
                                onInput={(value) =>
                                    setAddress(value.toString())
                                }
                            />
                        </div>
                        {/* display this only for EVM networks */}
                        <div className="modal__body-switch">
                            <PSwitch
                                value={evm}
                                onChange={(value) => setEvm(value)}
                            />
                            <p className="modal__body-switch-text">
                                Apply the entered address to all EVM networks:
                                Arbitrum, Ethereum, Polygon, Optimism, BSC
                            </p>
                        </div>
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
                                    wide
                                    children={<p>Import</p>}
                                    onClick={() => onImport(address)}
                                />
                            </div>
                        </div>
                    </div>
                }
                onClose={onClose}
            />
        </>,
        document.body
    );
};
