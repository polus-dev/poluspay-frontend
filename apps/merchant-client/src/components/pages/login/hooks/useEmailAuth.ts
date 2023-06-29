import {
    useAppDispatch,
    useAppSelector,
} from 'apps/merchant-client/src/store/hooks';
import { emailAuthThunk } from 'apps/merchant-client/src/store/api/endpoints/auth/emailAuthThunk';
import { useTimer } from 'libs/hooks/src/index';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                    dispatch(emailAuthThunk({ email }));
                } else {
                    dispatch(emailAuthThunk({ code, email }));
                }
            } catch (error) {
                console.error(error);
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
