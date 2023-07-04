import { InputProps, PInput } from '../PInput/PInput';

import './FormInput.scoped.scss'

interface FormInputProps extends InputProps {
    label?: string
    underlabel?: string
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    underlabel,
    ...props
}) => {
    return (
        <div className="form-input">
            {label || props.errors?.length && (
                <div className="form-input__data">
                    {label && (
                        <p className="form-input__data-label">
                            {label}
                        </p>
                    )}
                    {props.errors.length && (
                        <p className="form-input__data-label form-input__data-label--error">
                            {props.errors[0]}
                        </p>
                    )}
                </div>
            )}
            <div className="form-input__element">
                <PInput {...props} />
            </div>
            {underlabel && (
                <div className="form-input__data">
                    <p className="form-input__data-label form-input__data-label--dark">
                        {underlabel}
                    </p>
                </div>
            )}
        </div>
    );
};
