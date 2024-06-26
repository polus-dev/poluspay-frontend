import { useEffect } from 'react';

import { useAppDispatch } from '../../../../../store/hooks';
import {
    setSmartLineStatus,
    SmartLineStatus,
} from '../../../../../store/features/smartLine/smartLineSlice';

import { ReactComponent as IconError } from '../../../../../assets/icons/error.svg';

import './Error.scoped.scss';

interface FormErrorProps {
    message?: string;
}

export const FormError: React.FC<FormErrorProps> = ({
    message = 'Something went wrong',
}) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setSmartLineStatus(SmartLineStatus.ERROR));
    }, []);

    return (
        <div className="error">
            <div className="error__inner">
                <IconError className="error__inner-icon" />
                <p className="error__inner-text">{message}</p>
            </div>
        </div>
    );
};
