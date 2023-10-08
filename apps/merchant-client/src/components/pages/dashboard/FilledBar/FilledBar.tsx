import classNames from 'classnames';

import { ReactComponent as IconChevron } from '../../../../assets/icons/chevron.svg';

import './FilledBar.scoped.scss';

export interface FilledBar {
    label: string;
    value: string;
    color: string;
    fill: number;
}

interface FilledBarProps {
    item: FilledBar;
    clickable?: boolean;
    onClick: () => void;
}

export const DashboardFilledBar: React.FC<FilledBarProps> = ({
    item,
    clickable,
    onClick,
}) => {
    return (
        <div className="bar">
            <div className="bar__chart">
                <div
                    className="bar__chart-fill"
                    style={{
                        width: `${item.fill}%`,
                        backgroundColor: item.color,
                    }}
                />
            </div>
            <div className="bar__data">
                <div
                    className={classNames({
                        'bar__data-label': true,
                        'bar__data-label--clickable': clickable,
                    })}
                    onClick={clickable ? onClick : undefined}
                >
                    <p className="bar__data-label-text">{item.label}</p>
                    {clickable && (
                        <IconChevron className="bar__data-label-icon" />
                    )}
                </div>
                <p className="bar__data-value">{item.value}</p>
            </div>
        </div>
    );
};
