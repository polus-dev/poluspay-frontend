import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { AuthHelper } from '../logic/api';

export const useSystem = () => {
    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const isAuthLoading = useAppSelector((state) => state.auth.isAuthLoading);
    const navigate = useNavigate();
    const authHelper = new AuthHelper();
    useEffect(() => {
        if (!Boolean(authHelper.checkAuth()) || (!isAuth && !isAuthLoading)) {
            navigate('/login');
        }
    }, [isAuth, isAuthLoading]);
};
