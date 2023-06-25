import PButton from '../ui/PButton/PButton';
import { ReactComponent as LogoWalletConnect } from '../../assets/logos/wallet-connect.svg';

import './styles.scss';

const ConnectButton: React.FC = () => {
    return (
        <PButton
            wide
            size="lg"
            classname="connect-button"
            children={
                <>
                    <LogoWalletConnect className="connect-button__icon" />
                    Connect Wallet
                </>
            }
        />
    );
};

export default ConnectButton;
