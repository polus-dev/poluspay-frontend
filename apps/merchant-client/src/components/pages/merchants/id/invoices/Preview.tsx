import { ConnectButton } from '../../../../../components/ui/ConnectButton/ConnectButton';
import { ReactComponent as LogoPolusPay } from '../../../../../assets/logos/poluspay.svg';

import classNames from 'classnames';

import './Preview.scoped.scss';
import { UseFormWatch } from 'react-hook-form';
import { InvoiceForm } from '../../../../../pages/merchants/id/invoices/hooks/form.interface';
import { useGetMerchantIdFromParams } from '../../../../../hooks/useGetMerchantId';
import { useGetMerchantByIdQuery } from '@poluspay-frontend/merchant-query';

interface PreviewProps {
    isModal?: boolean;
    watch: UseFormWatch<InvoiceForm>;
}

export const MerchantInvoicesPreview: React.FC<PreviewProps> = ({
    isModal,
    watch,
}) => {
    const merchantId = useGetMerchantIdFromParams();
    const { data: merchant } = useGetMerchantByIdQuery({
        merchant_id: merchantId,
    });
    return (
        <div
            className={classNames({
                preview: true,
                'preview--block': !isModal,
            })}
        >
            <div className="preview__header">
                {merchant?.logo_status === 'confirmed' && merchant.logo && (
                    <img
                        className="preview__header-avatar"
                        src={merchant.logo}
                        alt="Avatar"
                    />
                )}
                <div className="preview__header-data">
                    <div className="preview__header-data__row">
                        <p className="preview__header-data__row-domain">
                            {merchant?.domain}
                        </p>
                        <p className="preview__header-data__row-amount">
                            Total: {watch('amount') || 0}
                            <span className="preview__header-data__row-amount preview__header-data__row-amount--dark">
                                {watch('asset')?.toUpperCase() || 'MATIC'}
                            </span>
                        </p>
                    </div>
                    <div className="preview__header-data__row">
                        <p className="preview__header-data__row-description">
                            {watch('description')}
                        </p>
                    </div>
                </div>
            </div>
            <div className="preview__divider" />
            <div className="preview__select">
                <img
                    className="preview__select-image"
                    src="/images/wallets/polygon.png"
                    alt="MATIC"
                />
                <p className="preview__select-text">Polygon</p>
            </div>
            <div className="preview__assets">
                {[1, 2, 3, 4, 5, 6].map((el, index) => (
                    <div
                        className={classNames({
                            'preview__assets-item': true,
                            'preview__assets-item--active': index === 0,
                        })}
                        key={el}
                    >
                        <img
                            className="preview__assets-item-image"
                            src="/images/wallets/polygon.png"
                            alt="MATIC"
                        />
                        <p className="preview__assets-item-name">MATIC</p>
                    </div>
                ))}
            </div>
            <div className="preview__timer">
                The invoice is active for 59:59
            </div>
            <div className="preview__button">
                <ConnectButton />
            </div>
            <div className="preview__footer">
                <p className="preview__footer-description">
                    By making a payment, you agree to the&nbsp;
                    <span className="preview__footer-description preview__footer-description--highlight">
                        Terms&nbsp;of&nbsp;Use
                    </span>
                    &nbsp;and&nbsp;
                    <span className="preview__footer-description preview__footer-description--highlight">
                        Privacy&nbsp;Policy
                    </span>
                </p>
                <div className="preview__footer-powered">
                    <p className="preview__footer-powered-text">Powered by</p>
                    <LogoPolusPay className="preview__footer-powered-logo" />
                </div>
            </div>
        </div>
    );
};
