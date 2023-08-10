import classNames from 'classnames';

import './CurrencyItem.scoped.scss';

interface CurrencyItemProps {
    active: boolean;
    image: string;
    name: string;
}

export const FormCurrencyItem: React.FC<CurrencyItemProps> = ({
    active,
    name,
    image,
}) => {
    return (
        <div
            className={classNames({
                currency: true,
                'currency--active': active,
            })}
        >
            <div className="currency__inner">
                <img className="currency__inner-image" src={image} alt={name} />
                <p className="currency__inner-text">{name}</p>
            </div>
        </div>
    );
};
