import { PDropdown } from '@poluspay-frontend/ui';
import { ReactComponent as IconChevron } from '../../../../assets/icons/chevron.svg';
import { ReactComponent as IconWallet } from '../../../../assets/icons/wallet.svg';

import './Wallet.scoped.scss';

export const AccountWallet: React.FC = () => {
    return (
        <div className="wallet">
            <PDropdown
                border
                align={window.innerWidth > 768 ? 'right' : 'center'}
                gap={12}
                minWidth={300}
                maxWidth={300}
                padding={[0, 0]}
                closeOnClickOutside={false}
                handler={
                    <div className="wallet__handler">
                        <IconWallet className="wallet__handler-icon" />
                        <IconChevron className="wallet__handler-icon wallet__handler-icon--arrow" />
                    </div>
                }
                content={
                    <div className="wallet__content">
                        <iframe
                            src="https://wallet.poluspay.com"
                            width={300}
                            height={500}
                            frameBorder="0"
                        />
                    </div>
                }
            />
        </div>
    );
};
