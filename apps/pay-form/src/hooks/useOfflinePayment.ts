import { useNavigate } from 'react-router-dom';

import { notify } from '@poluspay-frontend/ui';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

interface IGetOfflinePaymentIdResponse {
    payment_id: string;
}

export const useOfflinePayment = (merchantId: string) => {
    const domain = import.meta.env.VITE_API_URL.replace(/^https?:\/\//, '');
    const url = `wss://${domain}/ws/offline/${merchantId}`;

    const navigate = useNavigate();

    useEffect(() => {
        const socket = io(url);

        socket.on('message', (response: IGetOfflinePaymentIdResponse) => {
            if (!response) return undefined;

            socket.close();

            notify({
                title: 'Redirecting to payment...',
                status: 'warning',
                loading: true,
            });

            setTimeout(() => {
                navigate(`/id/${response.payment_id}`);
            }, 2000);
        });
    }, []);
};
