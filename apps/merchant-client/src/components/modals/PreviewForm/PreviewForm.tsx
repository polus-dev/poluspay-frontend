import ReactDOM from 'react-dom';

import { PModal } from '@poluspay-frontend/ui';
import { MerchantInvoicesPreview } from '../../pages/merchants/id/invoices/Preview';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

export const ModalPreviewForm: React.FC<ModalProps> = ({
    visible,
    onClose,
}) => {
    return ReactDOM.createPortal(
        <>
            <PModal
                visible={visible}
                body={
                    <MerchantInvoicesPreview
                        assetUrl={import.meta.env.VITE_ASSET_URL}
                        isModal
                    />
                }
                onClose={onClose}
            />
        </>,
        document.body
    );
};
