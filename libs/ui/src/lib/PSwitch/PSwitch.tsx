import { useEffect } from 'react';

import classNames from 'classnames';

import './styles.scss';

interface SwitchProps {
    value: boolean;
    name?: string;
    tabindex?: number;
    disabled?: boolean;
    onChange: (value: boolean) => void;
}

const PSwitch: React.FC<SwitchProps> = (props) => {
    const isOn = props.value == true;

    const handleUpdate = (value: boolean): void => {
        props.onChange(value);
    };

    const handleChange = (): void => {
        if (props.disabled) return undefined;

        const value = !props.value;

        handleUpdate(value);
    };

    const classnames = classNames('polus-ui__switch-inner', {
        'polus-ui__switch-inner--off': !isOn,
        'polus-ui__switch-inner--disabled': props.disabled,
    });

    return (
        <div className="polus-ui polus-ui__switch">
            <div className={classnames} onClick={handleChange}>
                <input
                    type="checkbox"
                    role="switch"
                    className="polus-ui__switch-input"
                    value={isOn}
                    name={props.name}
                    disabled={props.disabled}
                    tabIndex={props.tabindex}
                    aria-checked={isOn}
                    aria-disabled={props.disabled}
                    onKeyDown={handleChange}
                />
            </div>
        </div>
    );
};

export default PSwitch;
