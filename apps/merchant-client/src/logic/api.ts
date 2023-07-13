import axios from 'axios';
import { StoragePolus } from './storage';

export interface ErrorApiResp {
    code: number;
    message: string;
    field?: string;
}

export interface OtherApiResp {
    code: number;
}

interface LoginApiResp {
    code: number;
    access_token: string;
    refresh_token: string;
}

export interface AssetType {
    1:
        | {
              is_native: boolean;
              contract: string | null;
          }
        | undefined;
    137:
        | {
              is_native: boolean;
              contract: string | null;
          }
        | undefined;
}

export interface AssetsResp {
    code: number;
    dai: AssetType;
    eth: AssetType;
    matic: AssetType;
    usdc: AssetType;
    usdt: AssetType;
    wbtc: AssetType;
    weth: AssetType;
    wmatic: AssetType;
}

export interface UserApiResp {
    email: string;
}

export interface WebhookResp {
    id: string;
    merchant_id: string;
    payment_id: string;
    endpoint: string;
    response_body: string | null;
    response_status_code: number;
    created_at: string;
}

export interface MerchantApiResp {
    code: number;
    id: string;
    name: string;
    description: string;
    domain: string;
    domain_confirmation_code: string;
    evm_withdraw_address: string | null;
    tron_withdraw_address: string | null;
    is_domain_confirmed: boolean;
    success_redirect_url: string | null;
    fail_redirect_url: string | null;
    webhook_url: string | null;
}

export interface PaymentApiREsp {
    code: number;
    id: string;
    merchant_id: string;
    description: string;
    asset: 'usdt' | 'usdc' | 'weth' | 'matic';
    asset_amount: string;
    status: 'pending' | 'in_progress' | 'success' | 'failed';
    evm_withdraw_address: string | null;
    tron_withdraw_address: string | null;
    selected_blockchain: null;
    expires_at: string;
    created_at: string;
}

export interface AllApiResp {
    data: RespApi | ErrorApiResp;
    code: number;
}

export interface GenKeyApiResp {
    merchant_id: string;
    signing_key: string;
    code: number;
}

export type RespApi =
    | LoginApiResp
    | MerchantApiResp
    | MerchantApiResp[]
    | OtherApiResp
    | UserApiResp
    | GenKeyApiResp
    | PaymentApiREsp
    | PaymentApiREsp[]
    | WebhookResp
    | WebhookResp[]
    | AssetsResp;

export class AuthHelper {
    private _storage = new StoragePolus();
    private _token?: string;

    public checkAuth() {
        const token = this._storage.get('token');
        const refresh = this._storage.get('refresh');
        if (!refresh || !token) {
            return;
        }
        this._token = token;
        return { token, refresh };
    }

    public get token() {
        this.checkAuth();
        return this._token;
    }

    public setTokens(token: string, refresh: string) {
        this._storage.save('token', token);
        this._storage.save('refresh', refresh);
    }

    public logOut() {
        this._storage.del('token');
        this._storage.del('refresh');
    }

    public async send(
        type: string,
        path: string,
        params: any
    ): Promise<AllApiResp | ErrorApiResp | undefined> {
        try {
            const resp = await axios({
                url: `${this._url}${type}/${path}`,
                method: 'post',
                headers:
                    type !== 'public'
                        ? { Authorization: `Bearer ${this._token}` }
                        : {},
                data: params,
            });

            if (resp.data.code && resp.data.code >= 400) {
                const resFull: AllApiResp = {
                    data: <ErrorApiResp>resp.data,
                    code: (<ErrorApiResp>resp.data).code,
                };
                return resFull;
            }

            const res = <RespApi>resp.data;

            const resFull: AllApiResp = {
                data: res,
                code: 200,
            };

            return resFull;
        } catch (err) {
            console.error('err axios', err);

            console.log('CODE ', err);

            const errA: any = err; // TODO

            console.log('HEADERS ', errA.response.headers);

            if (errA.response.status === 500) {
                return {
                    code: 500,
                    data: {
                        code: 500,
                        message: errA.response.headers['x-request-id'],
                    },
                };
            }

            if (errA.response && errA.response.data) {
                if ((<ErrorApiResp>errA.response.data).code === 1002) {
                    // TODO
                    // this.refreshToken()
                }

                const resFull: AllApiResp = {
                    data: <ErrorApiResp>errA.response.data,
                    code: (<ErrorApiResp>errA.response.data).code,
                };
                return resFull;
            }
            console.log('Error not found object err');

            return undefined;
        }
    }

    public async sendEmailCode(
        email: string
    ): Promise<OtherApiResp | ErrorApiResp | undefined> {
        const res = await this.send('public', 'auth.send_code', { email });

        if (!res) {
            return undefined;
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data;
        }

        return <OtherApiResp>(<AllApiResp>res).data;
    }

    public async refreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<LoginApiResp | ErrorApiResp | undefined> {
        const res = await this.send('public', 'auth.refresh_token', {
            user_id,
            refresh_token,
        });

        if (!res) {
            return undefined;
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data;
        }

        return <LoginApiResp>(<AllApiResp>res).data;
    }
}
