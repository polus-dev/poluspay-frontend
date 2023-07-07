import { useEffect } from 'react';
import { InputProps, PInput } from '../PInput/PInput';

import './FormInput.scoped.scss';
import { error } from 'console';

interface FormInputProps extends InputProps {
    label?: string;
    underlabel?: string;
    error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    underlabel,
    ...props
}) => {
    return (
        <div className="form-input">
            {label ||
                (props.error && (
                    <div className="form-input__data">
                        {label && (
                            <p className="form-input__data-label">{label}</p>
                        )}
                        {props.error && (
                            <p className="form-input__data-label form-input__data-label--error">
                                {props.error}
                            </p>
                        )}
                    </div>
                ))}
            <div className="form-input__element">
                <PInput
                    {...props}
                    errors={props.error ? [props.error] : undefined}
                />
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
