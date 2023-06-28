import { useState } from 'react';

import { ReactComponent as IconUpload } from '../../../../../../assets/icons/upload.svg';
import { ReactComponent as IconWarning } from '../../../../../../assets/icons/warning.svg';
import { ReactComponent as IconEdit } from '../../../../../../assets/icons/edit.svg';

import './Avatar.scoped.scss';

type AvatarState = 'undefined' | 'moderated' | 'uploaded';

interface AvatarProps {
    openModal: () => void;
}

export const MerchantProfileAvatar: React.FC<AvatarProps> = ({ openModal }) => {
    // replace with actual data
    const [avatarState, setAvatarState] = useState<AvatarState>('undefined');

    return (
        <div className="avatar">
            {avatarState === 'undefined' && (
                <div className="avatar__upload" onClick={openModal}>
                    <IconUpload className="avatar__upload-icon" />
                </div>
            )}
            {avatarState === 'moderated' && (
                <div className="avatar__moderated">
                    <img
                        className="avatar__moderated-image"
                        src="/images/connect-button.jpg"
                        alt="Avatar"
                    />
                    <IconWarning className="avatar__moderated-icon" />
                </div>
            )}
            {avatarState === 'uploaded' && (
                <div className="avatar__uploaded" onClick={openModal}>
                    <img
                        className="avatar__uploaded-image"
                        src="/images/connect-button.jpg"
                        alt="Avatar"
                    />
                    <IconEdit className="avatar__uploaded-icon" />
                </div>
            )}
        </div>
    );
};
