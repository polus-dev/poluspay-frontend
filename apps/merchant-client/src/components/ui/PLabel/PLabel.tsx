import { CSSTransition } from 'react-transition-group';

import classNames from 'classnames';

import { ReactComponent as IconLoading } from '../../../assets/icons/loading.svg';
import { ReactComponent as IconSuccess } from '../../../assets/icons/checkmark.svg';
import { ReactComponent as IconError } from '../../../assets/icons/error.svg';
import { ReactComponent as IconWarning } from '../../../assets/icons/warning.svg';

import './styles.scss';

type LabelStatus = 'success' | 'error' | 'warning';

interface LabelProps {
    visible: boolean;
    status?: LabelStatus;
    loading?: boolean;
    title: string;
    description?: string;
}

const PLabel: React.FC<LabelProps> = ({ status = 'success', ...props }) => {
    const iconClassnames = classNames('polus-ui__notification-label-icon', {
        [`polus-ui__notification-label-icon--${status}`]: true,
    });

    const iconComponent = () => {
        if (status === 'error') {
            return <IconError className={iconClassnames} />;
        } else if (status === 'warning') {
            return <IconWarning className={iconClassnames} />;
        }

        return <IconSuccess className={iconClassnames} />;
    };

    const hasDescription =
        props.description !== undefined && props.description.length !== 0;

    return (
        <>
            <CSSTransition
                in={props.visible}
                timeout={300}
                classNames="polus-ui__notification"
                mountOnEnter
                unmountOnExit
            >
                <div className="polus-ui polus-ui__notification">
                    <div className="polus-ui__notification-container">
                        <div className="polus-ui__notification-label">
                            <div className="polus-ui__notification-label-left">
                                <div
                                    className={classNames(
                                        'polus-ui__notification-label-status',
                                        {
                                            [`polus-ui__notification-label-status--${status}`]:
                                                true,
                                        }
                                    )}
                                />
                                {props.loading ? (
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
                                    className={classNames(
                                        'polus-ui__notification-label-title',
                                        {
                                            'polus-ui__notification-label-title--small':
                                                hasDescription,
                                        }
                                    )}
                                >
                                    {props.title}
                                </div>
                                {hasDescription && (
                                    <div className="polus-ui__notification-label-description">
                                        {props.description}
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

export default PLabel;
