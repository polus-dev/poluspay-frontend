import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { ReactComponent as IconLoading } from '../assets/icons/loading.svg';

import './styles.scss';

export enum ButtonSize {
    Large = 'lg',
    Medium = 'md',
    Small = 'sm',
}

export enum ButtonColor {
    Blue = 'blue',
    Orange = 'orange',
}

export enum ButtonAlign {
    Center = 'center',
    Sides = 'sides',
    Left = 'left',
    Right = 'right',
}

interface ButtonProps {
    to?: string;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    target?: string;
    size?: ButtonSize | `${ButtonSize}`;
    color?: ButtonColor | `${ButtonColor}`;
    align?: ButtonAlign | `${ButtonAlign}`;
    outline?: boolean;
    basic?: boolean;
    wide?: boolean;
    disabled?: boolean;
    loading?: boolean;
    classname?: string;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler;
}

export const PButton: React.FC<ButtonProps> = ({
    target = '_blank',
    size = ButtonSize.Medium,
    color = ButtonColor.Blue,
    align = ButtonAlign.Center,
    ...props
}) => {
    const classnames: string = classNames('polus-ui', 'polus-ui__button', {
        [`polus-ui__button--${size}`]: true,
        [`polus-ui__button--${color}`]: true,
        [`polus-ui__button--${align}`]: true,
        [`${props.classname}`]: props.classname?.length,
        'polus-ui__button--disabled': props.disabled,
        'polus-ui__button--outline': props.outline,
        'polus-ui__button--basic': props.basic,
        'polus-ui__button--wide': props.wide,
    });

    const handleClick = (event: React.MouseEvent): void => {
        if (props.disabled || props.loading || !props.onClick) return undefined;

        props.onClick(event);
    };

    return (
        <>
            {props.to ? (
                <Link
                    to={props.to}
                    className={classnames}
                    onClick={handleClick}
                >
                    {props.loading ? (
                        <IconLoading className="polus-ui__button-loader" />
                    ) : (
                        props.children
                    )}
                </Link>
            ) : props.href ? (
                <a
                    href={props.href}
                    target={target}
                    className={classnames}
                    onClick={handleClick}
                >
                    {props.loading ? (
                        <IconLoading className="polus-ui__button-loader" />
                    ) : (
                        props.children
                    )}
                </a>
            ) : (
                <button
                    type={props.type}
                    className={classnames}
                    onClick={handleClick}
                >
                    {props.loading ? (
                        <IconLoading className="polus-ui__button-loader" />
                    ) : (
                        props.children
                    )}
                </button>
            )}
        </>
    );
};
