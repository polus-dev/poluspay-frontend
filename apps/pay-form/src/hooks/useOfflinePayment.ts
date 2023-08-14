import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { notify } from '@poluspay-frontend/ui';

interface IGetOfflinePaymentIdResponse {
    payment_id: string;
}

export const useOfflinePayment = (merchantId: string) => {
    const domain = import.meta.env.VITE_API_URL.replace(/^https?:\/\//, '');
    const url = `wss://${domain}ws/offline/${merchantId}`;

    const navigate = useNavigate();

    useEffect(() => {
        const socket = new WebSocket(url)

        socket.onmessage = (event) => {
            if (!event.data) return undefined

            const parsed: IGetOfflinePaymentIdResponse = JSON.parse(event.data)

            socket.close()

            notify({
                title: 'Redirecting...',
                description: 'Payment created by merchant',
                status: 'warning',
                loading: true,
            });

            setTimeout(() => {
                navigate(`/id/${parsed.payment_id}`);
            }, 2500);
        }
    }, []);
};
