import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';

import { PButton, PInput, PModal } from '@poluspay-frontend/ui';

import './MerchantDelete.scoped.scss';

interface ModalProps {
    visible: boolean;
    merchantName: string;
    onClose: () => void;
    onDelete: () => void;
}

export const ModalMerchantDelete: React.FC<ModalProps> = ({
    visible,
    merchantName,
    onClose,
    onDelete,
}) => {
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleDelete = () => {
        if (name !== merchantName) {
            setErrors(['Invalid name']);

            return undefined;
        }

        onDelete();
    };

    useEffect(() => {
        if (errors.length !== 0) {
            setErrors([]);
        }
    }, [name]);

    return ReactDOM.createPortal(
        <>
            <PModal
                visible={visible}
                closable={false}
                header={
                    <div className="modal__header">
                        <p className="modal__header-text">
                            Delete&nbsp;
                            <span className="modal__header-text modal__header-text--highlight">
                                {merchantName}
                            </span>
                            &nbsp;?
                        </p>
                    </div>
                }
                body={
                    <div className="modal__body">
                        <p className="modal__body-description">
                            To confirm, please enter the name of merchant
                        </p>
                        <PInput
                            autofocus
                            placeholder="Merchant name"
                            trim={false}
                            value={name}
                            errors={errors}
                            onInput={(value) => setName(value.toString())}
                        />
                        <div className="modal__body-buttons">
                            <div className="modal__body-buttons-item">
                                <PButton
                                    wide
                                    outline
                                    children={<p>Cancel</p>}
                                    onClick={onClose}
                                />
                            </div>
                            <div className="modal__body-buttons-item">
                                <PButton
                                    wide
                                    disabled={name !== merchantName}
                                    children={<p>Delete</p>}
                                    onClick={handleDelete}
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
