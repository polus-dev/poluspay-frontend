import { InputProps, PInput } from '../PInput/PInput';

// import './FormInput.scss';

export const FormInput = (props: InputProps) => {
    return (
        props.errors?.length && (
            <p className="form__inner-item-label form__inner-item-label--error">
                {props.errors[0]}
            </p>
        ),
        (<PInput {...props} />)
    );
};
