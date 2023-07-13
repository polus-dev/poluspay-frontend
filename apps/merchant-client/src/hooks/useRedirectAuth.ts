import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetMeQuery } from '../store/api/endpoints/user/User';

export const useRedirectAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isError } = useGetMeQuery(undefined, { pollingInterval: 900_000 });

    useEffect(() => {
        if (isError) {
            navigate('/login');
        }
    }, [navigate, isError, location]);
};
