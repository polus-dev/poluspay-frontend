import { useMemo } from 'react';

export const useRandomId = () => {
    return useMemo(() => Math.random().toString(36).substring(7), []);
};
