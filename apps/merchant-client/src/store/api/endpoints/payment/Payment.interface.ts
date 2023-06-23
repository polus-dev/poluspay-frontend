import { Asset_t, Blockchain_t, IPagination } from "../../types";

interface IPayment {
  id: string;
  merchant_id: string;
  description: string;
  assets: IAssets;
  evm_fee_address: string;
  // TODO: make types
  status: string;
  transaction?: ITransaction;
  // TODO: make types
  selected_blockchain: any;
  expires_at: string;
  created_at: string;
}

interface ITransaction {
  hash: string;
  network: Blockchain_t;
  network_id: number;
  notification_delivered: boolean;
}

export interface ICreatePaymentRequest {
  description: string;
  merchant_id: string;
  assets: Partial<IAssets>;
}

export type IAssets = {
  [key in Blockchain_t]: {
    [key in Asset_t]: {
      amount: string | number;
      address: string;
    };
  };
};

export interface IGetPaymentByMerchantId extends IPagination {
  merchant_id: string;
}

export interface IGetPaymentByPaymentId {
  payment_id: string;
}

export type ICreatePaymentResponse = IPayment;

export type IGetPaymentsResponseWithTotalCount = {
  data: IPayment[];
  totalCount: number;
};

export type IGetPaymentsResponse = IPayment[];
