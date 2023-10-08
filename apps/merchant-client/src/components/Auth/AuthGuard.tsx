import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { AuthHelper } from '../../logic/api';
import { useLazyGetMeQuery } from '@poluspay-frontend/merchant-query';

interface Props {
    children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
    const helper = new AuthHelper();
    const navigate = useNavigate();
    const location = useLocation();
    const [getMe] = useLazyGetMeQuery({ pollingInterval: 900_000 });

    useEffect(() => {
        if (helper.checkAuth())
            getMe()
                .unwrap()
                .catch(() => navigate('/login', { replace: true }));
    }, []);

    if (!helper.checkAuth() && !location.pathname.includes('login')) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};
