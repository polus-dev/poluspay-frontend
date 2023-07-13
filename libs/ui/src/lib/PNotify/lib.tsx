import { FC, useCallback, useEffect, useState, useId } from 'react';
import { Observer } from './observer';
import { PNotifyContainerProps } from './types';
import { PLabel } from '@poluspay-frontend/ui';
import './style.css';
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

export const PNotifyContainer: FC<PNotifyContainerProps> = ({ ms = 3000 }) => {
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
            <div className="PnotifyContainer">
                <div className="PnotifyContainer__wrapper">
                    <div className="PnotifyContainer__list">
                        {notify.map((item) => {
                            return (
                                //  <div
                                //   className={`PnotifyContainer__list--item ${removingNotifyId.includes(
                                //     item.id ? 'slide-out' : ''
                                //   )}`}
                                // >
                                <PLabel
                                    key={item.id}
                                    visible={notify.includes(item)}
                                    title={item.title}
                                    loading={item.loading}
                                    description={item.description}
                                    status={item.status}
                                />
                                // </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};
