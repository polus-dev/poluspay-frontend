import { FormProcessing } from '../../components/pages/form/states/Processing/Processing'

import './OfflineSales.scoped.scss'

export const OfflineSalesPage: React.FC = () => {
    return (
        <div className="offline">
            <div className="offline__inner">
                <FormProcessing
                    text="Waiting for invoice creation..."
                />
            </div>
        </div>
    )
}
