import { useParams } from 'react-router';
import { useOfflinePayment } from '../../hooks/useOfflinePayment';

import { FormProcessing } from '../../components/pages/form/states/Processing/Processing';

import './OfflineSales.scoped.scss';

export const OfflineSalesPage: React.FC = () => {
    const { id: merchantId } = useParams<{ id: string }>();

    if (!merchantId) return null;

    const data = useOfflinePayment(merchantId);

    return (
        <div className="offline">
            <div className="offline__inner">
                <FormProcessing text="Waiting for invoice creation..." />
            </div>
        </div>
    );
};
