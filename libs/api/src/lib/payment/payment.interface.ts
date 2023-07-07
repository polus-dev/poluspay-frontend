export interface IPayment {
    id: string;
    merchant_id: string;
    description: string;
    pay_link: string;
    assets: Assets;
    evm_fee_address: string;
    status: PaymentStatus;
    transaction?: ITransaction;
    expires_at: string;
    created_at: string;
}

type PaymentStatus = 'pending' | 'in_progress' | 'success' | 'failed';

interface ITransaction {
    hash: string;
    network: string;
    network_id: number;
    notification_delivered: boolean;
}

type Assets = {
    [blockchain: string]: {
        [asset: string]: {
            amount: string;
            fee: string;
            address: string;
        };
    };
};
