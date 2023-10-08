export interface IPayment {
    id: string;
    merchant_id: string;
    description: string;
    pay_link: string;
    assets: Asset[];
    paid_asset?: Asset;
    evm_fee_address: string;
    status: PaymentStatus;
    transaction?: ITransaction;
    expires_at: string;
    created_at: string;
}

export type PaymentStatus = 'pending' | 'in_progress' | 'success' | 'failed';

interface ITransaction {
    hash: string;
    network: string;
    network_id: number;
    notification_delivered: boolean;
}

type Asset = {
    network: string;
    name: string;
    amount: string;
    amount_decimals: string;
    fee: string;
    fee_decimals: string;
    address: string;
};
