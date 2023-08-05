import { FormQRCode } from './QRCode/QRCode';
import { FormWarning } from './Warning/Warning';

import './Native.scoped.scss';

export const FormNativePayment: React.FC = () => {
    return (
        <div className="native">
            <div className="native__qrcode">
                <FormQRCode />
            </div>
            <div className="native__warning">
                <FormWarning name="dai" amount={123123123} />
            </div>
        </div>
    );
};
