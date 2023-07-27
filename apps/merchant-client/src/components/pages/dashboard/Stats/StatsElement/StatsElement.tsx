import classNames from 'classnames';
import './StatsElement.scoped.scss';

export interface StatsElement {
    id: number;
    value: string;
    description: string;
    additional?: string;
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
                            'stats__header-additional--red': false,
                            'stats__header-additional--yellow': false,
                            'stats__header-additional--green': false,
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
