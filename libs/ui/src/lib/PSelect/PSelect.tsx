import React, { useRef, useState } from 'react';

import classNames from 'classnames';

import { ReactComponent as IconChevron } from '../assets/icons/chevron.svg';

import './styles.scss';

export enum SelectSize {
    Large = 'lg',
    Medium = 'md',
    Small = 'sm',
}

export enum SelectMode {
    Default = 'default',
    Search = 'search',
    Filter = 'filter',
}

export type SelectOption = {
    id: number | string;
    text: string;
    [key: string]: unknown;
};

interface SelectProps {
    active: SelectOption[];
    options: SelectOption[];
    size?: SelectSize | `${SelectSize}`;
    mode?: SelectMode | `${SelectMode}`;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    closeOnSelectSingle?: boolean;
    closeOnSelectMulti?: boolean;
    multi?: boolean;
    errors?: string[];
    prepend?: React.ReactNode;
    append?: React.ReactNode;
    onChange: (value: SelectOption[]) => void;
    onFocus?: (event: React.FocusEvent) => void;
    onBlur?: (event: React.FocusEvent) => void;
}

export const PSelect: React.FC<SelectProps> = ({
    size = SelectSize.Medium,
    mode = SelectMode.Default,
    closeOnSelectSingle = true,
    ...props
}) => {
    const elSelect = useRef<HTMLDivElement>(null);
    const elOptions = useRef<HTMLDivElement>(null);
    const elSearch = useRef<HTMLDivElement>(null);
    const [collapsed, setCollapsed] = useState(true);
    const [positioning, setPositioning] = useState<'top' | 'bottom'>('bottom');
    const hasPrefix = props.prepend !== undefined;
    const hasAppendix = props.append !== undefined;

    const handleFocus = (event: React.FocusEvent): void => {
        if (!props.onFocus) return undefined;

        props.onFocus(event);
    };

    const handleBlur = (event: React.FocusEvent): void => {
        if (!props.onBlur) return undefined;

        props.onBlur(event);
    };

    const toggle = () => {
        return collapsed ? expand() : collapse(true);
    };

    const onExpand = (event: React.FocusEvent) => {
        const target = event.relatedTarget as unknown as Node;

        if (elOptions.current?.isEqualNode(target)) {
            return undefined;
        }

        recalculateOptionsPosition();
    };

    const expand = () => {
        if (props.disabled) return undefined;

        setCollapsed(false);

        setTimeout(() => {
            elOptions.current?.focus({ preventScroll: true });

            if (mode === SelectMode.Search && elSearch.current) {
                elSearch.current.focus();
            }
        });
    };

    const onCollapse = (event: React.FocusEvent) => {
        const target = event.relatedTarget as unknown as Node;

        if (
            elOptions.current?.contains(target) ||
            elSelect.current?.contains(target)
        ) {
            return undefined;
        }

        collapse();
    };

    const collapse = (manual?: boolean) => {
        if (collapsed) return undefined;
        if (manual && elOptions.current) return elOptions.current.blur();

        elSelect.current?.blur();

        setTimeout(() => {
            setCollapsed(true);
        });
    };

    const isEnoughSpaceOnBottom = (): boolean => {
        if (!elSelect.current || !elOptions.current) return true;

        const optionsboxHeight = elOptions.current.offsetHeight;
        const selectHeight = elSelect.current.offsetHeight;
        const bottomGapHeight =
            window.innerHeight -
            (elSelect.current.getBoundingClientRect().top + selectHeight);

        return optionsboxHeight < bottomGapHeight;
    };

    const recalculateOptionsPosition = (): void => {
        if (collapsed) return undefined;

        isEnoughSpaceOnBottom()
            ? setPositioning('bottom')
            : setPositioning('top');
    };

    const isSelected = (option: SelectOption): boolean => {
        return props.active.some((el) => el.id === option.id);
    };

    const select = (option: SelectOption): void => {
        if (isSelected(option)) return undefined;

        const value = props.multi ? props.active.concat(option) : [option];

        props.onChange(value);

        if (
            (!props.multi && closeOnSelectSingle) ||
            (props.multi && props.closeOnSelectMulti)
        ) {
            setCollapsed(true);
        }
    };

    const remove = (option: SelectOption): void => {
        if (!isSelected(option)) return undefined;

        const index = props.active.findIndex((el) => el.id === option.id);
        const value = props.active
            .slice(0, index)
            .concat(props.active.slice(index + 1));

        props.onChange(value);
    };

    const classnames = classNames('polus-ui', 'polus-ui__select', {
        [`polus-ui__select--${size}`]: true,
        [`polus-ui__select--${positioning}`]: true,
        'polus-ui__select--readonly': props.readonly,
        'polus-ui__select--disabled': props.disabled,
        'polus-ui__select--errors': props.errors?.length,
    });

    return (
        <div ref={elSelect} tabIndex={0} className={classnames}>
            <div className="polus-ui__select-element">
                {hasPrefix && (
                    <div className="polus-ui__select-prefix">
                        {props.prepend}
                    </div>
                )}
                <div className="polus-ui__select-handler" onMouseDown={toggle}>
                    {!props.active.length ? (
                        <div className="polus-ui__select-placeholder">
                            {props.placeholder}
                        </div>
                    ) : (
                        <div className="polus-ui__select-choosen">
                            {!props.multi ? (
                                <div className="polus-ui__select-choosen-single">
                                    <div>{props.active[0].text}</div>
                                </div>
                            ) : (
                                <div className="polus-ui__select-choosen-multi">
                                    {props.active.map((el) => (
                                        <div
                                            key={el.id}
                                            onClick={() => remove(el)}
                                        >
                                            <div className="polus-ui__select-choosen-multi-item">
                                                {el.text}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {hasAppendix && (
                    <div className="polus-ui__select-appendix">
                        {props.append}
                    </div>
                )}
                <div className="polus-ui__select-chevron" onMouseDown={toggle}>
                    <IconChevron
                        className={classNames({
                            'polus-ui__select-chevron-icon': true,
                            'polus-ui__select-chevron-icon--active': !collapsed,
                        })}
                    />
                </div>
                {props.disabled ||
                    (props.readonly && (
                        <div
                            className={classNames({
                                'polus-ui__select-overlay': true,
                                'polus-ui__select-overlay--readonly':
                                    props.readonly,
                            })}
                        />
                    ))}
            </div>
            <div className="polus-ui__select-options-wrapper">
                {!collapsed && (
                    <div
                        ref={elOptions}
                        tabIndex={1}
                        className="polus-ui__select-options"
                        onFocus={(event) => onExpand(event)}
                        onBlur={(event) => onCollapse(event)}
                    >
                        <div className="polus-ui__select-options-inner">
                            {props.options.map((el) => (
                                <div key={el.id} onClick={() => select(el)}>
                                    <div
                                        className={classNames({
                                            'polus-ui__select-options-item':
                                                true,
                                            'polus-ui__select-options-item--selected':
                                                isSelected(el),
                                        })}
                                        onClick={() => select(el)}
                                    >
                                        {el.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
