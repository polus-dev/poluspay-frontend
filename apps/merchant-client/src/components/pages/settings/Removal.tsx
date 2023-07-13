import './Removal.scoped.scss';

interface RemovalProps {
    onDelete: () => void;
}

export const SettingsRemoval: React.FC<RemovalProps> = ({ onDelete }) => {
    return (
        <div className="removal">
            <h6 className="removal__title">Account removal</h6>
            <div className="removal__action" onClick={onDelete}>
                Delete account
            </div>
        </div>
    );
};
