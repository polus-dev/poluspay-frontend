import { ReactComponent as LogoPolus } from '../../../assets/logos/poluspay.svg';
import { ReactComponent as IconKYC } from '../../../assets/icons/login/kyc.svg';
import { ReactComponent as IconWallet } from '../../../assets/icons/login/wallet.svg';
import { ReactComponent as IconCurrency } from '../../../assets/icons/login/currency.svg';
import { ReactComponent as IconFee } from '../../../assets/icons/login/fee.svg';

import './About.scoped.scss';

interface Benefit {
    id: number;
    icon: React.FunctionComponent;
    description: string;
}

const LoginAbout: React.FC = () => {
    const data: Benefit[] = [
        {
            id: 1,
            icon: IconKYC,
            description:
                'No ID, No Bank Account required, just register for free now',
        },
        {
            id: 2,
            icon: IconWallet,
            description:
                'Payments are received directly into your wallet. Our service does not store any funds.',
        },
        {
            id: 3,
            icon: IconCurrency,
            description:
                'Allows users to pay in multiple coins while merchant receives the selected currency',
        },
        {
            id: 4,
            icon: IconFee,
            description:
                'No monthly fee, no withdrawal fee, lowest 0.2% industry fee',
        },
    ];

    const items = data.map((el) => {
        const Icon = el.icon;

        return (
            <div className="about__inner-container-item" key={el.id}>
                <div className="about__inner-container-item-icon">
                    <Icon />
                </div>
                <h6 className="about__inner-container-item-description">
                    {el.description}
                </h6>
            </div>
        );
    });

    return (
        <div className="about">
            <div className="about__inner">
                <LogoPolus className="about__inner-logo" />
                <div className="about__inner-container">{items}</div>
            </div>
        </div>
    );
};

export default LoginAbout;
