import classNames from 'classnames';

import './StatsElement.scoped.scss';

export interface StatsElement {
    id: number;
    value: string;
    description: string;
    additional?: string;
    additionalColor?: {
        red: boolean;
        yellow: boolean;
        green: boolean;
    };
}

interface StatsElementProps {
    item: StatsElement;
}

export const DashboardStatsElement: React.FC<StatsElementProps> = ({
    item,
}) => {
    return (
        <div className="stats">
            <div className="stats__header">
                <p className="stats__header-value">{item.value}</p>
                {item.additional && (
                    <p
                        className={classNames({
                            'stats__header-additional': true,
                            'stats__header-additional--red':
                                item.additionalColor?.red,
                            'stats__header-additional--yellow':
                                item.additionalColor?.yellow,
                            'stats__header-additional--green':
                                item.additionalColor?.green,
                        })}
                    >
                        {item.additional}
                    </p>
                )}
            </div>
            <p className="stats__description">{item.description}</p>
        </div>
    );
};
