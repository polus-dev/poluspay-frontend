import { ReactComponent as IconChevron } from '../../../../../assets/icons/chevron.svg';

import './Select.scoped.scss';

interface SelectOption {
    id?: number | string;
    text: string;
    image: string;
}

interface FormSelectProps {
    item: SelectOption;
    onClick: () => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({ item, onClick }) => {
    return (
        <div className="select" onClick={onClick}>
            <div className="select__inner">
                <img
                    className="select__inner-image"
                    src={`/images/${item.image}.png`}
                    alt="Polygon"
                />
                <p className="select__inner-text">{item.text}</p>
            </div>
            <IconChevron className="select__icon" />
        </div>
    );
};
