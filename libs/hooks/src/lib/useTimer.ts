import { useEffect, useRef, useState } from 'react';

export const useTimer = (expiresAt: string | undefined) => {
  const [timer, setTimer] = useState('00:00');
  const [isExpired, setIsExpired] = useState(false);
  const id = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    if (expiresAt) {
      const eventTime = new Date(expiresAt).getTime() / 1000;
      const currentTime = Date.now() / 1000;
      let diffTime = eventTime - currentTime - 1;
      if (diffTime <= 0) return;
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
        console.log(isExpired);
        diffTime--;
      }, 1000);
    }
  }, [expiresAt]);

  return { timer, isExpired };
};
