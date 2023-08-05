import { FormNativePayment } from '../../components/pages/form/Native/Native';
import { FormWarning } from '../../components/pages/form/Warning/Warning';

export const QRCodeSubPage = () => {
    return (
        <>
            <div className="form__native">
                <FormNativePayment />
            </div>
            <div className="form__warning">
                <FormWarning name="dai" amount={123123123} />
            </div>
        </>
    );
};
