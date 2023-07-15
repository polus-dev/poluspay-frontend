import type { LogoStatus } from '../../../../../../store/api/endpoints/merchant/Merchant.interface';

import { ReactComponent as IconUpload } from '../../../../../../assets/icons/upload.svg';
import { ReactComponent as IconWarning } from '../../../../../../assets/icons/warning.svg';
import { ReactComponent as IconEdit } from '../../../../../../assets/icons/edit.svg';

import './Avatar.scoped.scss';
import { useRandomId } from '@poluspay-frontend/hooks';

interface AvatarProps {
    openModal: () => void;
    image: string | null;
    avatarStatus: LogoStatus;
}

export const MerchantProfileAvatar: React.FC<AvatarProps> = ({
    openModal,
    image,
    avatarStatus,
}) => {
    const randomId = useRandomId();
    return (
        <div className="avatar">
            {!avatarStatus && (
                <div className="avatar__upload" onClick={openModal}>
                    <IconUpload className="avatar__upload-icon" />
                </div>
            )}
            {avatarStatus === 'on_moderation' && (
                <div className="avatar__moderated">
                    {/*TODO: add moderation image*/}
                    <img
                        className="avatar__moderated-image"
                        src="/images/connect-button.jpg"
                        alt="Avatar"
                    />
                    <IconWarning className="avatar__moderated-icon" />
                </div>
            )}
            {avatarStatus === 'confirmed' && (
                <div className="avatar__uploaded" onClick={openModal}>
                    <img
                        className="avatar__uploaded-image"
                        src={
                            image
                                ? `${image}id=${randomId}`
                                : '/images/connect-button.jpg'
                        }
                        alt="Avatar"
                    />
                    <IconEdit className="avatar__uploaded-icon" />
                </div>
            )}
            {/*TODO: add declined status  */}
            {/*TODO: add declined image*/}
        </div>
    );
};
