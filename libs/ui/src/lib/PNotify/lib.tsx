import { useCallback, useEffect, useState } from 'react';

import { Observer } from './observer';

import { PLabel } from '@poluspay-frontend/ui';

interface INotify {
    title: string;
    loading?: boolean;
    description?: string;
    status?: 'error' | 'success' | 'warning';
}

interface PNotifyContainerProps {
    ms?: number
}

const observer = new Observer<INotify>();

export function notify(args: INotify) {
    observer.emit(args);
}

export const PNotifyContainer: React.FC<PNotifyContainerProps> = ({
    ms = 3000,
}) => {
    const [notify, setNotify] = useState<(INotify & { id: string })[]>([]);

    const removeNotifyTimer = useCallback(
        (id: string) => {
            return setTimeout(() => {
                setNotify((state) => state.filter((item) => item.id !== id));
            }, ms + 200);
        },
        [ms]
    );

    useEffect(() => {
        observer.subscribe((newNotify) => {
            const id = Math.random().toString(36).substring(2, 9);

            setNotify((state) => [...state, { ...newNotify, id }]);

            removeNotifyTimer(id);
        });
    }, []);

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
