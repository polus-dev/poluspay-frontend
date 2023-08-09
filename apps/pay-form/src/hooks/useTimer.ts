import { useEffect, useState } from 'react';
import { expiresInfo } from '../../../../tools/date/isExpired';

export const useTimer = (expiresAt: string) => {
    const [timer, setTimer] = useState('00:00');
    useEffect(() => {
        let { diffTime } = expiresInfo(expiresAt);
        const id = setInterval(() => {
            if (diffTime <= 0) {
                clearInterval(id);
                return;
            }
            const minutes = Math.floor(diffTime / 60);
            const seconds = Math.floor(diffTime % 60);

            setTimer(
                `${minutes < 10 ? '0' + minutes : minutes}:${
                    seconds < 10 ? '0' + seconds : seconds
                }`
            );
            diffTime--;
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return { timer };
};
