import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import './styles.scss';

export enum TabsSize {
    Large = 'lg',
    Medium = 'md',
    Small = 'sm',
}

export interface TabsItem {
    id: string;
    text: string;
    content?: string;
}

interface TabsProps {
    active: TabsItem;
    disabled?: boolean;
    items: TabsItem[];
    size?: TabsSize | `${TabsSize}`;
    query?: boolean;
    onChange: (item: TabsItem) => void;
}

const PTabs: React.FC<TabsProps> = ({
    active,
    disabled,
    items,
    size = TabsSize.Medium,
    query,
    onChange,
}) => {
    const select = (item: TabsItem): void => {
        if (disabled) return undefined;

        onChange(item);
    };

    const setTabsQuery = () => {
        if (!query) return undefined;

        const [search, setSearch] = useSearchParams();

        setSearch({ tab: active.id });

        const targetSearch = search.get('tab');
        for (let i = 0; i <= items.length - 1; i++) {
            if (targetSearch === items[i].id) {
                onChange(items[i]);
            }
        }
    };

    useEffect(() => {
        setTabsQuery();
    });

    return (
        <div className="polus-ui polus-ui__tabs">
            <div className="polus-ui__tabs-items">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={classNames('polus-ui__tabs-item', {
                            'polus-ui__tabs-item--active':
                                item.id === active.id,
                            'polus-ui__tabs-item--disabled': disabled,
                            [`polus-ui__tabs-item--${size}`]: true,
                        })}
                        onClick={() => select(item)}
                    >
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PTabs;
