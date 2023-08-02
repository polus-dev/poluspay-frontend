import { isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { notify } from '@poluspay-frontend/ui';
import { IResponseError } from '@poluspay-frontend/api';

interface IPayload {
    status: number;
    data: IResponseError;
}

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action: PayloadAction<IPayload>) => {
        if (isRejectedWithValue(action)) {
            if (action.payload.status < 500)
                notify({
                    status: 'error',
                    title: action.payload.data.field || 'Error',
                    description: action.payload.data.message,
                });
            else if (action.payload.status >= 500)
             window.history.replaceState(null, '', '/500');
        }
        return next(action);
    };
