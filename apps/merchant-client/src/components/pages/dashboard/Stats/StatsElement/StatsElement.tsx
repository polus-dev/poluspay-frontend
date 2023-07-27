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

export const DashboardStatsElement: React.FC<StatsElementProps> = ({ item }) => {
    return (
        <div className="stats">
            <div className="stats__header">
                <p className="stats__header-value">{item.value}</p>
                {item.additional && (
                    <p className="stats__header-additional">
                        {item.additional}
                    </p>
                )}
            </div>
            <p className="stats__description">{item.description}</p>
        </div>
    );
};
