import ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';

import { PButton, PModal } from '@poluspay-frontend/ui';
import { ReactComponent as IconUpload } from '../../../assets/icons/upload.svg';

import classNames from 'classnames';

import './MerchantAvatar.scoped.scss';

interface ModalProps {
    visible: boolean;
    isUploading: boolean;
    onClose: () => void;
    onSave: (image: File) => void;
}

export const ModalMerchantAvatar: React.FC<ModalProps> = ({
    visible,
    isUploading,
    onClose,
    onSave,
}) => {
    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!visible && error) {
            setError(false);
        }
    }, [visible, error]);

    const validateImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false);

        const file = event.target.files?.[0];

        if (!file || !file.type.match('image/png')) {
            setError(true);

            return undefined;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e: ProgressEvent<FileReader>) => {
            const img = new Image();

            img.src = e.target?.result as string;
            img.onload = () => {
                const width = img.width;
                const height = img.height;

                if (width !== 500 || height !== 500) {
                    setError(true);

                    return undefined;
                }

                setPreviewImage(reader.result?.toString() || '');
                setImage(file);
            };
        };
    };

    return ReactDOM.createPortal(
        <>
            <PModal
                visible={visible}
                closable={false}
                body={
                    <div className="modal__body">
                        <div className="modal__body-container">
                            <div className="modal__body-container-upload">
                                <div className="modal__body-container-upload__handler">
                                    {previewImage && !error && (
                                        <img
                                            className="modal__body-container-upload__handler-image"
                                            alt="Preview"
                                            src={previewImage}
                                        />
                                    )}
                                    <input
                                        type="file"
                                        className="modal__body-container-upload__handler-input"
                                        onChange={validateImage}
                                    />
                                    <IconUpload
                                        className={classNames({
                                            'modal__body-container-upload__handler-icon':
                                                true,
                                            'modal__body-container-upload__handler-icon--active':
                                                !image ||
                                                !previewImage ||
                                                error,
                                        })}
                                    />
                                </div>
                            </div>
                            <p className="modal__body-container-title">
                                Upload avatar
                            </p>
                            <p className="modal__body-container-description">
                                500x500px .png
                            </p>
                        </div>
                        {error && (
                            <div className="modal__body-error">
                                Image does not match the requirements
                            </div>
                        )}
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
                                    loading={isUploading}
                                    disabled={error || !previewImage || !image}
                                    children={<p>Save</p>}
                                    onClick={() => {
                                        if (image) {
                                            onSave(image);
                                            onClose();
                                        }
                                    }}
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
