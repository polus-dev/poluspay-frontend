import { ReactComponent as LogoWalletConnect } from '../../../../assets/logos/wallet-connect.svg';

import classNames from 'classnames';

import './Button.scoped.scss';

type ButtonText = 'Connect Wallet' | `Pay ≈ ${string} ${string}` | 'Cancel' |'Loading...';

interface FormButtonProps<T extends string> {
    text: T;
    hasIcon?: T extends 'Connect Wallet' ? true : false;
    disabled?: boolean
    onClick: () => void;
}

export const FormButton =  <T extends ButtonText>({
    text,
    hasIcon,
    disabled,
    onClick,
}: FormButtonProps<T>) => {
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
            {hasIcon || text === "Connect Wallet" && <LogoWalletConnect className="form-button__icon" />}
            {text}
        </div>
    );
};
