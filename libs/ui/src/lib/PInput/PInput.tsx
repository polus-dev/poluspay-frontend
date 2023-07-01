import React, { useRef } from 'react';

import classNames from 'classnames';

import './styles.scss';

export enum InputSize {
    Large = 'lg',
    Medium = 'md',
    Small = 'sm',
}

export enum InputType {
    Text = 'text',
    Number = 'number',
}

export enum InputAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

interface InputProps {
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    autofocus?: boolean;
    trim?: boolean;
    type?: InputType | `${InputType}`;
    size?: InputSize | `${InputSize}`;
    align?: InputAlign | `${InputAlign}`;
    errors?: string[];
    overlay?: boolean;
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    reg?: any;
    onInput?: (value: string | number) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
}

export const PInput: React.FC<InputProps> = ({
    trim = true,
    overlay = true,
    type = InputType.Text,
    size = InputSize.Medium,
    align = InputAlign.Left,
    ...props
}) => {
    const wrapperClassnames: string = classNames(
        'polus-ui',
        'polus-ui__input',
        {
            [`polus-ui__input--${size}`]: true,
            'polus-ui__input--readonly': props.readonly,
            'polus-ui__input--disabled': props.disabled,
            'polus-ui__input--errors': props.errors?.length,
        }
    );

    const inputClassnames: string = classNames('polus-ui__input-element', {
        [`polus-ui__input-element--${align}`]: true,
        'polus-ui__input-element--disabled': props.disabled,
        'polus-ui__input-element--errors': props.errors?.length,
    });

    const overlayClassnames: string = classNames('polus-ui__input-overlay', {
        'polus-ui__input-overlay--readonly': props.readonly,
    });

    const elInput = useRef<HTMLInputElement>(null);

    const hasPrefix = props.prepend !== undefined;
    const hasAppendix = props.append !== undefined;

    const handleInput = (event: React.FormEvent): void => {
        if (!event.target) return undefined;

        const target = event.target as HTMLInputElement;
        const value =
            type === 'number'
                ? parseInt(target.value, 10) || target.value
                : trim
                ? target.value.trim()
                : target.value;

        props.onInput?.(value);
    };

    const handleFocus = (event: React.FocusEvent): void => {
        if (!props.onFocus) return undefined;

        props.onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent): void => {
        if (!props.onBlur) return undefined;

        props.onBlur(event);
    };

    return (
        <div className={wrapperClassnames}>
            {hasPrefix && (
                <div className="polus-ui__input-prefix">{props.prepend}</div>
            )}
            <input
                ref={elInput}
                role="input"
                className={inputClassnames}
                type={type}
                value={props.value}
                disabled={props.disabled}
                readOnly={props.readonly}
                placeholder={props.placeholder}
                autoFocus={props.autofocus}
                onFocus={(event) => handleFocus(event)}
                onBlur={(event) => handleBlur(event)}
                onInput={(event) => handleInput(event)}
                {...props.reg}
            />
            {hasAppendix && (
                <div className="polus-ui__input-appendix">{props.append}</div>
            )}
            {(props.disabled || props.readonly) && overlay && (
                <div className={overlayClassnames} />
            )}
        </div>
    );
};
