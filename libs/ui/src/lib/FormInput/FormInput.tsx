import { InputProps, PInput } from '../PInput/PInput';

import classNames from 'classnames';

import './FormInput.scoped.scss';

type LabelSize = 'sm' | 'md' | 'lg'

interface FormInputProps extends InputProps {
    label?: string;
    labelSize?: LabelSize
    asterisk?: boolean
    underlabel?: string;
    error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
    label,
    labelSize = 'sm',
    asterisk,
    underlabel,
    ...props
}) => {
    return (
        <div className="form-input">
            {label ||
                (props.error && (
                    <div className="form-input__data">
                        {label && (
                            <p
                                className={classNames({
                                    'form-input__data-label': true,
                                    [`form-input__data-label--${labelSize}`]: true
                                })}
                            >
                                {label}
                                {asterisk && (
                                    <span className="form-input__data-label-asterisk">
                                        &nbsp;*
                                    </span>
                                )}
                            </p>
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
