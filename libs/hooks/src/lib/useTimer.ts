import { useEffect, useRef, useState } from 'react';

export const useTimer = (expiresAt: string) => {
  const [timer, setTimer] = useState('00:00');
  const [isExpired, setIsExpired] = useState(false);
  const eventTime = new Date(expiresAt).getTime() / 1000;
  const currentTime = Date.now() / 1000;
  const id = useRef<ReturnType<typeof setInterval>>();
  let diffTime = eventTime - currentTime - 1;
  useEffect(() => {
    if (!expiresAt && id.current) return;
    id.current = setInterval(() => {
      if (diffTime <= 0) {
        setIsExpired(true);
        clearInterval(id.current);
        return;
      }
      const minutes = Math.floor(diffTime / 60);
      const seconds = Math.floor(diffTime % 60);

      setTimer(
        `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds
        }`
      );
      diffTime--;
    }, 1000);
  }, [expiresAt]);

  return { timer, isExpired };
};
