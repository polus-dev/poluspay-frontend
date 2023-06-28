import { useState } from 'react';

import { useModal } from '../../../../../../hooks/useModal';

import { PButton, PInput } from '@poluspay-frontend/ui';
import { MerchantProfileAvatar } from './Avatar';
import { ModalMerchantDelete } from '../../../../../modals/MerchantDelete/MerchantDelete';
import { ReactComponent as IconCopy } from '../../../../../../assets/icons/copy.svg';

import classNames from 'classnames';

import './Form.scoped.scss';

export const MerchantProfileForm: React.FC = () => {
    const modalDelete = useModal();
    const modalAvatar = useModal();

    const merchantId = '90ca217e-e429-4cbd-bf53-52b44e351e59';

    const [copied, setCopied] = useState(false);

    const [name, setName] = useState('');
    const [domain, setDomain] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');

    const getShortMerchantId = () => {
        return `${merchantId.slice(0, 8)}...${merchantId.slice(-8)}`;
    };

    const copyId = () => {
        if (copied) return undefined;

        navigator.clipboard.writeText(merchantId);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 3000);
    };

    const handleTextareaInput = (event: React.FormEvent): void => {
        if (!event.target) return undefined;

        const target = event.target as HTMLInputElement;
        const value = target.value.trim();

        setDescription(value);
    };

    const handleMerchantRemoval = () => {
        // modal passes this prop only when merchant name entered correctly
        // close modal, then remove merchant, then navigate to /merchants
        // then show the notification about successfull removal

        console.log('remove merchant');
    };

    return (
        <div className="form">
            <h4 className="form__title">Merchant</h4>
            <div className="form__inner">
                <div className="form__inner-user">
                    <div className="form__inner-user__avatar">
                        <MerchantProfileAvatar
                            openModal={() => console.log('open modal')}
                        />
                    </div>
                    <div className="form__inner-user__data">
                        <p className="form__inner-user__data-name">
                            Merchant name
                        </p>
                        <div className="form__inner-user__data-id">
                            <p
                                className={classNames({
                                    'form__inner-user__data-id-value': true,
                                    'form__inner-user__data-id-value--blue':
                                        copied,
                                })}
                            >
                                {copied ? 'Copied!' : getShortMerchantId()}
                            </p>
                            <p
                                className={classNames({
                                    'form__inner-user__data-id-value': true,
                                    'form__inner-user__data-id-value--blue':
                                        copied,
                                    'form__inner-user__data-id-value--desktop':
                                        true,
                                })}
                            >
                                {copied ? 'Copied!' : merchantId}
                            </p>
                            <IconCopy
                                className="form__inner-user__data-id-icon"
                                onClick={copyId}
                            />
                        </div>
                    </div>
                </div>
                <div className="form__inner-container">
                    <div className="form__inner-container-topline">
                        <div className="form__inner-container__item">
                            <p className="form__inner-container__item-label">
                                Merchant name
                            </p>
                            <PInput
                                placeholder="Company name"
                                value={name}
                                onInput={(value) => setName(value.toString())}
                            />
                        </div>
                        <div className="form__inner-container__item">
                            <p className="form__inner-container__item-label">
                                Website
                            </p>
                            <PInput
                                placeholder="https://example.com"
                                value={domain}
                                onInput={(value) => setDomain(value.toString())}
                            />
                        </div>
                        <div className="form__inner-container__item">
                            <p className="form__inner-container__item-label">
                                Brand
                            </p>
                            <PInput
                                placeholder="Brand name"
                                value={brand}
                                onInput={(value) => setBrand(value.toString())}
                            />
                        </div>
                    </div>
                    <div className="form__inner-container__item">
                        <p className="form__inner-container__item-label">
                            Description
                        </p>
                        <textarea
                            placeholder="Few words about merchant"
                            className="form__inner-container__item-textarea"
                            value={description}
                            onInput={(event) => handleTextareaInput(event)}
                        />
                    </div>
                </div>
                <div className="form__inner-buttons">
                    <div className="form__inner-buttons-item">
                        {/* add disabled if no changes were made */}
                        <PButton
                            wide
                            disabled={true}
                            children={<p>Save</p>}
                            onClick={() => console.log('save changes')}
                        />
                    </div>
                    <div
                        className="form__inner-buttons-item form__inner-buttons-item--custom"
                        onClick={() => modalDelete.open()}
                    >
                        Delete merchant
                    </div>
                </div>
            </div>
            <ModalMerchantDelete
                visible={modalDelete.visible}
                onClose={() => modalDelete.close()}
                onDelete={handleMerchantRemoval}
            />
        </div>
    );
};
