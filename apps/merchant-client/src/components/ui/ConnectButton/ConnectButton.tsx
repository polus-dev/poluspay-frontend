import { ReactComponent as LogoWalletConnect } from '../../../assets/logos/wallet-connect.svg';

import classNames from 'classnames';

import './styles.scss';

interface ConnectButtonProps {
    text?: string;
    hasIcon?: boolean;
    onClick?: () => void;
}

export const ConnectButton: React.FC<ConnectButtonProps> = ({
    text = 'Connect Wallet',
    hasIcon = true,
    onClick,
}) => {
    const handleClick = () => {
        if (!onClick) return undefined;

        onClick();
    };

    return (
        <div className="connect-button" onClick={handleClick}>
            {hasIcon && <LogoWalletConnect className="connect-button__icon" />}
            {text}
        </div>
    );
};
