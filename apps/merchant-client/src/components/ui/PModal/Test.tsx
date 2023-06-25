import ReactDOM from 'react-dom';

import PModal from './PModal';
import PButton from '../PButton/PButton';

interface ModalProps {
    visible: boolean;
    onClose: () => void;
}

const ModalHyeta: React.FC<ModalProps> = (props) => {
    return ReactDOM.createPortal(
        <>
            <PModal
                visible={props.visible}
                header={<p>I am modal</p>}
                body={
                    <PButton
                        wide
                        children={'Mmmmm hyetaaaa'}
                        onClick={props.onClose}
                    />
                }
                onClose={props.onClose}
            />
        </>,
        document.body
    );
};

export default ModalHyeta;
