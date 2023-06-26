import PButton from '../ui/PButton/PButton';
import { ReactComponent as LogoWalletConnect } from '../../assets/logos/wallet-connect.svg';

import './styles.scss';

interface ConnectButtonProps {
  onClick?: React.MouseEventHandler;
  text?: string;
}

const ConnectButton: React.FC<ConnectButtonProps> = (props) => {
  return (
    <PButton
      wide
      size="lg"
      onClick={props.onClick}
      classname="connect-button"
      children={
        <>
          <LogoWalletConnect className="connect-button__icon" />
          {props.text || 'Connect Wallet'}
        </>
      }
    />
  );
};

export default ConnectButton;
