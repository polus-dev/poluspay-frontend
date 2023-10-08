import type { LogoStatus } from '@poluspay-frontend/api';

import { useRandomId } from '@poluspay-frontend/hooks';

import { ReactComponent as IconUpload } from '../../../../../../assets/icons/upload.svg';
import { ReactComponent as IconWarning } from '../../../../../../assets/icons/warning.svg';
import { ReactComponent as IconEdit } from '../../../../../../assets/icons/edit.svg';
import { ReactComponent as IconTimer } from '../../../../../../assets/icons/timer.svg';
import { ReactComponent as IconCross } from '../../../../../../assets/icons/cross.svg';

import './Avatar.scoped.scss';

interface AvatarProps {
    image: string | null;
    avatarStatus: LogoStatus;
    openModal: () => void;
}

export const MerchantProfileAvatar: React.FC<AvatarProps> = ({
    image,
    avatarStatus,
    openModal,
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
                    <IconTimer className="avatar__moderated-image" />
                    <IconWarning className="avatar__moderated-icon" />
                </div>
            )}
            {avatarStatus === 'confirmed' && (
                <div className="avatar__confirmed" onClick={openModal}>
                    {image && (
                        <img
                            className="avatar__confirmed-image"
                            src={`${image}?id=${randomId}`}
                            alt="Avatar"
                        />
                    )}
                    <IconEdit className="avatar__confirmed-icon" />
                </div>
            )}
            {avatarStatus === 'declined' && (
                <div className="avatar__declined" onClick={openModal}>
                    <IconCross className="avatar__declined-image" />
                    <IconUpload className="avatar__declined-icon" />
                </div>
            )}
        </div>
    );
};
