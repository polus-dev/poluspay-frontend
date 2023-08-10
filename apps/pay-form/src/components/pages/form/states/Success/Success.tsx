import { FormFooter } from '../../Footer/Footer';
import { FormHeader, FormHeaderProps } from '../../Header/Header';
import { ReactComponent as IconCheckmark } from '../../../../../assets/icons/checkmark.svg';

import './Success.scoped.scss';

interface FormSuccessProps extends FormHeaderProps {}
export const FormSuccess = (props: FormSuccessProps) => {
    return (
        <div className="success">
            <div className="success__header">
                <FormHeader {...props} />
            </div>
            <div className="success__content">
                <IconCheckmark className="success__content-icon" />
                <p className="success__content-text">The invoice is paid</p>
            </div>
            <div className="success__footer">
                <FormFooter hasLegal={false} />
            </div>
        </div>
    );
};
