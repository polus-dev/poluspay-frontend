import { ReactComponent as LogoWalletConnect } from '../../../../assets/logos/wallet-connect.svg';

import classNames from 'classnames';

import './Button.scoped.scss';

interface FormButtonProps {
    text?: string;
    hasIcon?: boolean;
    disabled?: boolean;
    onClick: () => void;
}

export const FormButton: React.FC<FormButtonProps> = ({
    text,
    hasIcon = true,
    disabled,
    onClick,
}) => {
    const handleClick = () => {
        if (disabled) return undefined;

        onClick();
    };

    return (
        <div
            className={classNames({
                'form-button': true,
                'form-button--disabled': disabled,
            })}
            onClick={handleClick}
        >
            {hasIcon && <LogoWalletConnect className="form-button__icon" />}
            {text || 'Connect Wallet'}
        </div>
    );
};
