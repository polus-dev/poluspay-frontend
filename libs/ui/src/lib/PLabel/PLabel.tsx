import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import classNames from 'classnames';

import { ReactComponent as IconLoading } from '../assets/icons/loading.svg';
import { ReactComponent as IconSuccess } from '../assets/icons/checkmark.svg';
import { ReactComponent as IconError } from '../assets/icons/error.svg';
import { ReactComponent as IconWarning } from '../assets/icons/warning.svg';

import './styles.scss';

type LabelStatus = 'success' | 'error' | 'warning';

export interface LabelProps {
    visible: boolean;
    status?: LabelStatus;
    loading?: boolean;
    title: string;
    description?: string;
}

export const PLabel: React.FC<LabelProps> = ({
    status = 'success',
    visible,
    loading,
    title,
    description
}) => {
    const [top, setTop] = useState(0);
    const elHeader = useRef<HTMLElement | null>(null);

    const calulateTopOffset = (): void => {
        if (!elHeader.current) return undefined;

        const height = elHeader.current.offsetHeight;

        setTop(height + 12)
    };

    const iconClassnames = classNames({
        'polus-ui__notification-label-icon': true,
        [`polus-ui__notification-label-icon--${status}`]: true
    });

    const iconComponent = () => {
        if (status === 'error') {
            return <IconError className={iconClassnames} />;
        } else if (status === 'warning') {
            return <IconWarning className={iconClassnames} />;
        }

        return <IconSuccess className={iconClassnames} />;
    };

    const hasDescription = description !== undefined && description.length !== 0;

    useEffect(() => {
        elHeader.current = document.querySelector('header');
        window.addEventListener('scroll', calulateTopOffset);

        calulateTopOffset();
    }, []);

    return (
        <>
            <CSSTransition
                in={visible}
                timeout={300}
                classNames="polus-ui__notification"
                mountOnEnter
                unmountOnExit
            >
                <div className="polus-ui polus-ui__notification">
                    <div className="polus-ui__notification-container">
                        <div
                            className="polus-ui__notification-label"
                            style={{ marginTop: top ? `${top}px` : undefined }}
                        >
                            <div className="polus-ui__notification-label-left">
                                <div
                                    className={classNames({
                                        'polus-ui__notification-label-status': true,
                                        [`polus-ui__notification-label-status--${status}`]:
                                            true,
                                    })}
                                />
                                {loading ? (
                                    <IconLoading
                                        className={classNames(
                                            'polus-ui__notification-label-icon',
                                            'polus-ui__notification-label-icon--loading'
                                        )}
                                    />
                                ) : (
                                    iconComponent()
                                )}
                            </div>
                            <div className="polus-ui__notification-label-right">
                                <div
                                    className={classNames({
                                        'polus-ui__notification-label-title': true,
                                        'polus-ui__notification-label-title--small':
                                            hasDescription,
                                    })}
                                >
                                    {title}
                                </div>
                                {hasDescription && (
                                    <div className="polus-ui__notification-label-description">
                                        {description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};
