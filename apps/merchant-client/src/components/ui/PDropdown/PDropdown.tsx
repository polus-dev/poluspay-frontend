import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import './styles.scss';

export enum DropdownPosition {
    Top = 'top',
    Bottom = 'bottom',
}

export enum DropdownAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

interface DropdownProps {
    position?: DropdownPosition | `${DropdownPosition}`;
    align?: DropdownAlign | `${DropdownAlign}`;
    gap?: number;
    maxWidth?: number;
    minWidth?: number;
    padding?: number[];
    border?: boolean;
    handler: React.ReactNode;
    content: React.ReactNode;
    onShow?: () => void;
    onHide?: () => void;
}

const PDropdown: React.FC<DropdownProps> = ({
    position = DropdownPosition.Bottom,
    align = DropdownAlign.Left,
    gap = 14,
    padding = [16, 24],
    ...props
}) => {
    const elHandler = useRef<HTMLDivElement>(null);
    const elContent = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const [vertical, setVertical] = useState(position);
    const [horizontal, setHorizontal] = useState(align);
    const [visibilityStyles, setVisibilityStyles] =
        useState<React.CSSProperties>({
            opacity: 0,
            pointerEvents: 'none',
        });

    const style: React.CSSProperties = {
        margin: `${gap}px 0`,
        maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined,
        minWidth: props.minWidth ? `${props.minWidth}px` : undefined,
        padding: `${padding[0]}px ${padding[1]}px`,
    };

    const isEnoughSpaceOnPosition = (position: DropdownPosition) => {
        if (!visible || !elHandler.current || !elContent.current) return true;

        const contentHeight = elContent.current.offsetHeight;
        const bottomGap =
            window.innerHeight -
            elHandler.current.getBoundingClientRect().bottom;
        const topGap = elHandler.current.getBoundingClientRect().top;

        switch (position) {
            case DropdownPosition.Bottom:
                return contentHeight < bottomGap;
            case DropdownPosition.Top:
                return contentHeight < topGap;
            default:
                return false;
        }
    };

    const isEnoughSpaceOnAlign = (align: DropdownAlign) => {
        if (!visible || !elHandler.current || !elContent.current) return true;

        const contentWidth = elContent.current.offsetWidth;
        const handlerWidth = elHandler.current.offsetWidth;
        const overflow = contentWidth - handlerWidth;
        const leftGap =
            elHandler.current.getBoundingClientRect().left - overflow;
        const rightGap =
            window.innerWidth -
            elHandler.current.getBoundingClientRect().right -
            overflow;

        switch (align) {
            case DropdownAlign.Left:
                return contentWidth < rightGap;
            case DropdownAlign.Center:
                return (
                    contentWidth - overflow / 2 < leftGap &&
                    contentWidth - overflow / 2 < rightGap
                );
            case DropdownAlign.Right:
                return contentWidth < leftGap;
            default:
                return false;
        }
    };

    const show = () => {
        setVisible(true);

        setTimeout(() => {
            elContent.current?.focus({ preventScroll: true });
        });
    };

    const hide = (manual = true) => {
        if (!visible) return undefined;
        if (manual && elContent.current) return elContent.current.blur();

        elHandler.current!.blur();

        setTimeout(() => {
            setVisible(false);
        });
    };

    const toggle = () => {
        return visible ? hide() : show();
    };

    const onHide = (event: React.FocusEvent) => {
        const target = event.relatedTarget as unknown as Node;

        if (
            elContent.current?.contains(target) ||
            elHandler.current?.contains(target)
        ) {
            return undefined;
        }

        hide(false);
    };

    useEffect(() => {
        if (visible) {
            setVisibilityStyles({
                opacity: 1,
                pointerEvents: 'all',
            });
        } else {
            setVisibilityStyles({
                opacity: 0,
                pointerEvents: 'none',
            });
        }
    }, [visible]);

    useLayoutEffect(() => {
        if (!visible) {
            props.onHide ? props.onHide() : undefined;
        }

        const verticals = Object.values(DropdownPosition)
            .map((el) => ({
                position: el,
                available: isEnoughSpaceOnPosition(el),
            }))
            .filter((el) => el.available);

        const horizontals = Object.values(DropdownAlign)
            .map((el) => ({ align: el, available: isEnoughSpaceOnAlign(el) }))
            .filter((el) => el.available);

        setVertical(
            verticals.find((el) => el.position === position)?.position ||
                verticals[0]?.position ||
                position
        );

        setHorizontal(
            horizontals.find((el) => el.align === align)?.align ||
                horizontals[0]?.align ||
                align
        );

        props.onHide ? props.onHide() : undefined;
    });

    const classnames = classNames('polus-ui', 'polus-ui__dropdown', {
        [`polus-ui__dropdown--${vertical}`]: true,
        [`polus-ui__dropdown--${horizontal}`]: true,
    });

    return (
        <div tabIndex={0} className={classnames}>
            <div
                ref={elHandler}
                className="polus-ui__dropdown-handler"
                onMouseDown={toggle}
            >
                {props.handler}
            </div>
            <div className="polus-ui__dropdown-content-wrapper">
                {visible && (
                    <div
                        ref={elContent}
                        tabIndex={1}
                        style={{ ...style, ...visibilityStyles }}
                        className={classNames({
                            'polus-ui__dropdown-content': true,
                            'polus-ui__dropdown-content--border': props.border,
                        })}
                        onBlur={onHide}
                    >
                        {props.content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDropdown;
