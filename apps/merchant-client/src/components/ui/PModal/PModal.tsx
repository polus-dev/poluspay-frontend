import { useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import { ReactComponent as IconCross } from '../../../assets/icons/cross.svg';

import './styles.scss';

interface ModalProps {
    visible: boolean;
    closable?: boolean;
    tabindex?: number;
    header?: React.ReactNode;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    onClose: () => void;
}

const PModal: React.FC<ModalProps> = ({ closable = true, ...props }) => {
    const handleScrollable = (show: boolean) => {
        const classname = 'polus-ui__scroll-lock';

        if (show) {
            document.body.classList.add(classname);
            document.documentElement.classList.add(classname);
        } else {
            document.body.classList.remove(classname);
            document.documentElement.classList.remove(classname);
        }
    };

    useEffect(() => {
        handleScrollable(props.visible);
    }, [props.visible]);

    return (
        <>
            <CSSTransition
                in={props.visible}
                timeout={300}
                classNames="polus-ui__modal"
                mountOnEnter
                unmountOnExit
            >
                <div className="polus-ui polus-ui__modal">
                    <div className="polus-ui__modal-block">
                        <div className="polus-ui__modal-block-inner">
                            {closable && (
                                <div
                                    className="polus-ui__modal-close"
                                    tabIndex={props.tabindex}
                                    onClick={() => props.onClose()}
                                >
                                    <IconCross className="polus-ui__modal-icon polus-ui__modal-icon--close" />
                                </div>
                            )}
                            <div className="polus-ui__modal-header">
                                {props.header}
                            </div>
                            <div className="polus-ui__modal-body">
                                {props.body}
                            </div>
                            <div className="polus-ui__modal-footer">
                                {props.footer}
                            </div>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </>
    );
};

export default PModal;
