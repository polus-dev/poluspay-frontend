import { useCopyText } from '@poluspay-frontend/hooks';
import { useGetMerchantIdFromParams } from '../../../../../src/hooks/useGetMerchantId';

import { FormInput, PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconCopy } from '../../../../assets/icons/copy.svg';

import './Brand.scoped.scss';

export const MerchantBrandPage: React.FC = () => {
    const id = useGetMerchantIdFromParams();

    const copy = useCopyText();

    return (
        <div className="brand">
            <div className="brand__header">
                <h4 className="brand__header-title">
                    Indicate and confirm the brand
                </h4>
                <p className="brand__header-description">
                    Contact our manager for further action
                </p>
            </div>
            <div className="brand__divider" />
            <div className="brand__manager">
                <div className="brand__manager-image-wrapper">
                    <img
                        className="brand__manager-image"
                        src="/images/sergey.jpg"
                        alt="Manager's photo"
                    />
                </div>
                <p className="brand__manager-name">Sergey</p>
            </div>
            <div className="brand__form">
                <div className="brand__form-item">
                    <FormInput
                        readonly
                        label="Copy and provide this ID to our manager:"
                        overlay={false}
                        value={copy.copied ? 'Copied!' : id}
                        append={
                            <IconCopy
                                className="brand__form-item-icon"
                                onClick={() => copy.copy(id)}
                            />
                        }
                        onInput={() => {}}
                    />
                </div>
            </div>
            <div className="brand__button">
                <PButton
                    wide
                    href="https://t.me/polus_sergey/"
                    target="_blank"
                    children={<p>Contact</p>}
                />
            </div>
        </div>
    );
};
