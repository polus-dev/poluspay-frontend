import { PLabel, LabelProps } from '@poluspay-frontend/ui';
import { useState } from 'react';
import * as ReactDOM from 'react-dom';
interface NotifyProps extends Omit<LabelProps, 'visible'> {
    timeOut?: number;
}

type LabelStatus = 'success' | 'error' | 'warning';
export const useNotify = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<LabelStatus>('success');
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    ReactDOM.createPortal(
        PLabel({
            visible: isVisible,
            status,
            description,
            title,
            loading,
        }),
        document.body
    );

    const notify = (args: NotifyProps) => {
        setIsVisible(true);
        setStatus(args.status || 'success');
        setLoading(args.loading || false);
        setTitle(args.title || '');
        setDescription(args.description || '');
        setTimeout(() => {
            setIsVisible(false);
        }, args.timeOut || 3000);
    };

    return {
        notify,
    };
};