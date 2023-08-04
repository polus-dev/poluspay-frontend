import { ReactComponent as IconError } from '../../../../assets/icons/error.svg';

import './Error.scoped.scss';

interface FormErrorProps {
    message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({
    message = 'Something went wrong',
}) => {
    return (
        <div className="error">
            <div className="error__inner">
                <IconError className="error__inner-icon" />
                <p className="error__inner-text">{message}</p>
            </div>
        </div>
    );
};
