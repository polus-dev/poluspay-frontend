import { ReactComponent as IconWarning } from '../../../../assets/icons/warning.svg';

import './Warning.scoped.scss';

interface WarningProps {
    name: string;
    amount: number;
}

export const FormWarning: React.FC<WarningProps> = ({ name, amount }) => {
    return (
        <div className="warning">
            <div className="warning__inner">
                <IconWarning className="warning__inner-icon" />
                <p className="warning__inner-text">
                    Check the amount you send in {name}, in case it will be
                    different from {amount}, funds may be lost
                </p>
            </div>
        </div>
    );
};
