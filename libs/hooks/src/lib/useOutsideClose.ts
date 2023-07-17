import {useEffect, useRef} from "react";

export const useOutsideClose = (onClose: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {

        onClose();
      }
    };
      // document.addEventListener('click', checkIfClickedOutside);
    return () => {
      document.removeEventListener('click', checkIfClickedOutside);
    };
  }, []);
  return ref;
}
