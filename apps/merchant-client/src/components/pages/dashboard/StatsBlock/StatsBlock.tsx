import './StatsBlock.scoped.scss';
import CountUp from "react-countup";

export interface StatsBlock {
    id: number;
    value: string;
    description: string;
    additional?: string;
}

interface StatsBlockProps {
    item: StatsBlock;
}

export const DashboardStatsBlock: React.FC<StatsBlockProps> = ({ item }) => {
    return (
        <div className="stats">
            <div className="stats__header">
                <p className="stats__header-value">{<CountUp end={+item.value} duration={1} />}</p>
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
