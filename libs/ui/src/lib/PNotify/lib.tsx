import { useCallback, useEffect, useState } from 'react';

import { Observer } from './observer';
import { PNotifyContainerProps } from './types';

import { PLabel } from '@poluspay-frontend/ui';

interface INotify {
    title: string;
    loading?: boolean;
    description?: string;
    status?: 'error' | 'success' | 'warning';
}

const observer = new Observer<INotify>();

export function notify(args: INotify) {
    observer.emit(args);
}

export const PNotifyContainer: React.FC<PNotifyContainerProps> = ({ ms = 3000 }) => {
    const [notify, setNotify] = useState<(INotify & { id: string })[]>([]);

    useEffect(() => {
        observer.subscribe((newNotify) => {
            const id = Math.random().toString(36).substr(2, 9);
            setNotify((state) => [...state, { ...newNotify, id }]);
            removeNotifyTimer(id);
        });
    }, []);

    const removeNotifyTimer = useCallback(
        (id: string) => {
            return setTimeout(() => {
                setNotify((state) => state.filter((item) => item.id !== id));
            }, ms + 200);
        },
        [ms]
    );

    return (
        <>
            {notify.map((item) => {
                return (
                    <PLabel
                        key={item.id}
                        visible={notify.includes(item)}
                        title={item.title}
                        loading={item.loading}
                        description={item.description}
                        status={item.status}
                    />
                );
            })}
        </>
    );
};
