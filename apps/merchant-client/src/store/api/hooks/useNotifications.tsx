import type { IMerchant, IPagination } from '@poluspay-frontend/api';

import { useState } from 'react';

import axios from 'axios';

import { AuthHelper } from '../../../logic/api';

type NotificationStatus = 'low' | 'medium' | 'critical';
type NotificationAction = 'read';

export interface INotification {
    id: string;
    merchant_id: string | null;
    merchant: IMerchant | null;
    title: string;
    text: string;
    status: NotificationStatus;
    received_at: string | null;
    viewed_at: string | null;
    created_at: string;
}

interface IGetNotificationsRequest extends IPagination {
    is_viewed?: boolean;
    is_received?: boolean;
}

interface IGetNotificationsResponse {
    notifications: INotification[];
    total_count: number;
}

interface IReadNotificationRequest {
    action: NotificationAction;
    notification_id: string;
}

const apiUrl = import.meta.env.VITE_API_URL;
const domain = apiUrl.replace(/^https?:\/\//, '');
const wsUrl = 'wss://' + domain + 'ws/notifications';

const token = new AuthHelper().checkAuth()?.token;

const socket = new WebSocket(wsUrl + `/?auth=${token}`);

const api = axios.create({
    baseURL: apiUrl + 'private',
    headers: {
        common: {
            'Content-Type': 'application/json',
        },
    },
});

const sortNotifications = (a: INotification, b: INotification) => {
    const aViewed = a.viewed_at === null;
    const bViewed = b.viewed_at === null;

    if (aViewed !== bViewed) {
        return aViewed ? -1 : 1;
    }

    const aDate = new Date(a.created_at).getDate();
    const bDate = new Date(b.created_at).getDate();

    return bDate - aDate;
};

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>();

    const getNotifications = async (
        requestData?: IGetNotificationsRequest
    ): Promise<void> => {
        const { data } = await api.post<IGetNotificationsResponse>(
            'user.notifications.get',
            requestData || {}
        );

        setNotifications(data.notifications);
    };

    const handleNotificationRead = async (
        notificationId: string
    ): Promise<void> => {
        const data: IReadNotificationRequest = {
            action: 'read',
            notification_id: notificationId,
        };

        socket.send(JSON.stringify(data));
    };

    socket.onmessage = (event) => {
        console.log(event);
        console.log(event.data);

        if (!event.data) return undefined;

        const parsed: INotification = JSON.parse(event.data);

        if (parsed.viewed_at === null) {
            notifications && notifications.length > 0
                ? setNotifications([parsed, ...notifications])
                : setNotifications([parsed]);
        } else {
            if (!notifications || !notifications.length) return undefined;

            // replacing the notification with updated viewed_at
            const index = notifications.findIndex(
                (notification) => notification.id === parsed.id
            );

            if (index !== -1) {
                const updated = [...notifications];
                updated[index] = parsed;

                updated.sort(sortNotifications);

                setNotifications(updated);
            }
        }
    };

    api.interceptors.request.use((request) => {
        const headers = request.headers || {};

        if (!token) return request;

        request.headers = Object.assign(headers, {
            Authorization: `Bearer ${token}`,
        });

        return request;
    });

    return {
        notifications,
        getNotifications,
        handleNotificationRead,
    };
};
