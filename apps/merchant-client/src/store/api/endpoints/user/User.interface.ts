import type { IMerchant, IPagination } from '@poluspay-frontend/api';

export interface IUserEntity {
    email: string | null;
    address: string | null;
}

type NotificationStatus = 'low' | 'medium' | 'critical';

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

export interface IGetNotificationsRequest extends IPagination {
    is_viewed?: boolean;
    is_received?: boolean;
}

export interface IGetNotificationsResponse {
    notifications: INotification[];
    total_count: number;
}
