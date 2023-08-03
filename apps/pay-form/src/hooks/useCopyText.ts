import React, { useState } from 'react';

export const useCopyText = () => {
    const [copied, setCopied] = useState(false);

    const copy = async (
        value: string,
        event?: React.MouseEvent,
        timeout?: number
    ) => {
        event?.preventDefault();
        event?.stopPropagation();

        if (copied) return undefined;

        await navigator.clipboard.writeText(value);

        setCopied(true);

        setTimeout(
            () => {
                setCopied(false);
            },
            timeout ? timeout : 2000
        );
    };

    return {
        copied,
        copy,
    };
};
