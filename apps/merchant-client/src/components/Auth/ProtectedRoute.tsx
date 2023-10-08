import { AuthHelper } from '../../logic/api';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const helper = new AuthHelper();
    const user = helper.checkAuth();

    if (!user) {
        return <Navigate to="/login" replace={true} />;
    }

    return children;
};
