import { useEffect } from 'react';

import { useAppDispatch } from '../../../../../store/hooks';
import {
    setSmartLineStatus,
    SmartLineStatus,
} from '../../../../../store/features/smartLine/smartLineSlice';

import { ReactComponent as IconLoading } from '../../../../../assets/icons/loading.svg';

import './Processing.scoped.scss';

interface FormProcessingProps {
    text?: string;
}

export const FormProcessing: React.FC<FormProcessingProps> = ({
    text = 'The payment is being processed',
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSmartLineStatus(SmartLineStatus.IN_PROGRESS));
    }, []);

    return (
        <div className="processing">
            <div className="processing__inner">
                <IconLoading className="processing__inner-icon" />
                <p className="processing__inner-text">{text}</p>
            </div>
        </div>
    );
};
