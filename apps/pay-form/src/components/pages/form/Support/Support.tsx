import { useTimer } from '@poluspay-frontend/hooks';

import { PButton } from '@poluspay-frontend/ui';
import { ReactComponent as IconUser } from '../../../../assets/icons/user.svg';

import './Support.scoped.scss';

interface IFormSupportProps {
    expiresAt: string;
}

export const FormSupport: React.FC<IFormSupportProps> = ({ expiresAt }) => {
    const { timer } = useTimer(expiresAt);

    return (
        <div className="support">
            <div className="support__button">
                <PButton
                    wide
                    size="lg"
                    href="https://t.me/polus_sergey/"
                    target="_blank"
                    children={
                        <div className="support__button-inner">
                            <IconUser className="support__button-icon" />
                            Support
                        </div>
                    }
                />
            </div>
            <div className="support__button support__button--timer">
                <PButton wide outline size="lg" children={<p>{timer}</p>} />
            </div>
        </div>
    );
};
