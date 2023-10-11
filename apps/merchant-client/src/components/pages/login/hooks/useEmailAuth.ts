import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../../src/store/hooks';
import { emailAuthThunk } from '../../../../../src/store/api/endpoints/auth/emailAuthThunk';
import { useTimer } from '@poluspay-frontend/hooks';
import { notify } from '@poluspay-frontend/ui';

interface IEmailAuth {
    email: string;
    code?: string;
}
export const useEmailAuth = () => {
    const dispatch = useAppDispatch();
    const isAuthLoading = useAppSelector((state) => state.auth.loading);
    const success = useAppSelector((state) => state.auth.success);
    const navigate = useNavigate();
    const [expiresAt, setExpiresAt] = useState<string>();
    const { timer, isExpired } = useTimer(expiresAt);

    useEffect(() => {
        if (success) navigate('/');
    }, [success]);

    const sendCode = useCallback(
        async (args: IEmailAuth) => {
            try {
                const { email, code } = args;

                if (!code) {
                    const sendCodeLimitExpire = new Date(
                        Date.now() + 60000
                    ).toISOString();
                    setExpiresAt(sendCodeLimitExpire);

                    await dispatch(emailAuthThunk({ email })).unwrap();
                } else {
                    await dispatch(emailAuthThunk({ code, email })).unwrap();
                }
            } catch (error) {
                notify({
                    title: 'Email auth error',
                    status: 'error',
                    description: (error as any).message,
                });

                return Promise.reject({ error });
            }
        },
        [isExpired, dispatch]
    );

    return {
        sendCode,
        timer,
        isExpired,
        isAuthLoading,
    };
};
