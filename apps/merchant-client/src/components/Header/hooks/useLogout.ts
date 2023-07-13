import { useAppDispatch } from 'apps/merchant-client/src/store/hooks';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout as logoutAction } from '../../../store/features/auth/authSlice';

export const useLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const logout = useCallback(() => {
        dispatch(logoutAction());
        navigate('/login');
    }, [dispatch, navigate]);
    return { logout };
};
