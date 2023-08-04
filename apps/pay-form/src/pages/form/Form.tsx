import './Form.scoped.scss';
import classNames from "classnames";

interface IFormPageProps {
    children?: React.ReactNode
    isError?: boolean;
}

export const FormPage= (props: IFormPageProps) => {
    return (
        <div className="form-page">
            <div
                className={classNames({
                    form: true,
                    'form--error': props.isError,
                })}
            >
            {props.children}
            </div>
        </div>
    );
};
