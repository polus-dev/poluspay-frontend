import { FC, useEffect, useState } from 'react';
import { Observer } from './observer';
import { PNotifyContainerProps } from './types';
import { PLabel } from '@poluspay-frontend/ui';

const observer = new Observer<INotify>({ title: '' });
interface INotify {
    title: string;
    loading?: boolean;
    description?: string;
    status?: 'error' | 'success' | 'warning';
}
export function notify(args: INotify) {
    observer.emit(args);
}

export const PNotifyContainer: FC<PNotifyContainerProps> = ({ ms = 3000 }) => {
    const [notify, setNotify] = useState<INotify>();

    useEffect(() => {
        return observer.subscribe((newNotify) => {
            setNotify(notify);
        });
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setNotify(undefined);
        }, ms);
        return () => clearTimeout(timerId);
    }, [notify, ms]);

    return (
        <PLabel
            visible={Boolean(notify)}
            title={notify?.title || ''}
            status={notify?.status}
            loading={notify?.loading}
            description={notify?.description}
        />
    );
};
