import { useAppDispatch } from 'apps/merchant-client/src/store/hooks';
import { emailAuthThunk } from 'apps/merchant-client/src/store/api/endpoints/auth/emailAuthThunk';
import { useTimer } from 'libs/hooks/src/index';
import { useCallback, useEffect, useState } from 'react';
import { StoragePolus } from 'apps/merchant-client/src/logic/storage';

interface IEmailAuth {
    email: string;
    code?: string;
}
export const useEmailAuth = () => {
    const dispatch = useAppDispatch();
    const storage = new StoragePolus();
    const [expiresAt, setExpiresAt] = useState<string>(
        storage.get('send_code_limit')
    );
    const { timer, isExpired } = useTimer(expiresAt);

    const sendCode = useCallback(
        (args: IEmailAuth) => {
            const { email, code } = args;
            if (!code) {
                const sendCodeLimitExpire = new Date(
                    Date.now() + 60000
                ).toISOString();
                setExpiresAt(sendCodeLimitExpire);
                storage.save('send_code_limit', sendCodeLimitExpire);
            }
            isExpired && dispatch(emailAuthThunk({ code, email }));
        },
        [isExpired, dispatch]
    );

    useEffect(() => {
        if (isExpired) {
            storage.del('send_code_limit');
        }
    }, [isExpired]);
    return {
        sendCode,
        timer,
        isExpired,
        inProgress: Boolean(storage.get('send_code_limit')),
    };
};
