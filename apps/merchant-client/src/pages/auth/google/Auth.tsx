import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doGoogleLogin } from '../../../store/api/endpoints/auth/googleAuth';

export const GoogleAuth = () => {
    const navigate = useNavigate();
    useEffect(() => {
        doGoogleLogin().then(() => {
            navigate('/');
        });
    }, [navigate]);
    return <h1>Auth...</h1>;
};
