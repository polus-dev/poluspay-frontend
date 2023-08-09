import './ProgressBar.scoped.scss';

interface ProgressBarProps {
    value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
    return (
        <div className="progress-bar">
            <div
                className="progress-bar__fill"
                style={{
                    width: `${value}%` || '0%',
                }}
            />
        </div>
    );
};
