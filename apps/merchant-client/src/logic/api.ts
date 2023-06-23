import axios from 'axios'
import { StoragePolus } from './storage'

export interface ErrorApiResp {
    code: number,
    message: string,
    field?: string
}

export interface OtherApiResp {
    code: number
}

interface LoginApiResp {
    code: number,
    access_token: string,
    refresh_token: string
}

export interface AssetType {
    1: {
        is_native: boolean,
        contract: string | null
    } | undefined,
    137: {
        is_native: boolean,
        contract: string | null
    } | undefined
}

export interface AssetsResp {
    code: number,
    dai: AssetType,
    eth: AssetType,
    matic: AssetType,
    usdc: AssetType,
    usdt: AssetType,
    wbtc: AssetType,
    weth: AssetType,
    wmatic: AssetType
}

export interface UserApiResp {
    email: string
}

export interface WebhookResp {
    id: string,
    merchant_id: string,
    payment_id: string,
    endpoint: string,
    response_body: string | null,
    response_status_code: number,
    created_at: string
}

export interface MerchantApiResp {
    code: number,
    id: string,
    name: string,
    description: string,
    domain: string,
    domain_confirmation_code: string,
    evm_withdraw_address: string | null,
    tron_withdraw_address: string | null,
    is_domain_confirmed: boolean,
    success_redirect_url: string | null,
    fail_redirect_url: string | null,
    webhook_url: string | null

}

export interface PaymentApiREsp {
    code: number,
    id: string,
    merchant_id: string,
    description: string,
    asset: 'usdt' | 'usdc' | 'weth' | 'matic',
    asset_amount: string,
    status: 'pending' | 'in_progress' | 'success' | 'failed',
    evm_withdraw_address: string | null,
    tron_withdraw_address: string | null,
    selected_blockchain: null,
    expires_at: string,
    created_at: string
}

export interface AllApiResp {
    data: RespApi | ErrorApiResp,
    code: number
}

export interface GenKeyApiResp {
    merchant_id: string,
    signing_key: string,
    code: number
}

export type RespApi = LoginApiResp |
    MerchantApiResp |
    MerchantApiResp[] |
    OtherApiResp |
    UserApiResp |
    GenKeyApiResp |
    PaymentApiREsp |
    PaymentApiREsp[] |
    WebhookResp |
    WebhookResp[] |
    AssetsResp

export class NewApi {
    private _url = import.meta.env.VITE_REACT_APP_BASE_URL

    private _token: string | undefined

    private _tokenRefresh: string | undefined

    private _user_id: string | undefined

    private _storage: StoragePolus

    private _au: boolean = false

    public get au(): boolean {
        return this._au
    }

    constructor(token?: string) {
        this._token = token
        this._storage = new StoragePolus()

        // TODO: ???
        this.checkAuth()
    }


    get token(): string | undefined {
        return this._token
    }

    public checkAuth(): boolean {
        const t = this._storage.get('token')
        const t2 = this._storage.get('refresh')
        const t3 = this._storage.get('user')
        if (!t || !t2 || !t3) {
            this._au = false
            return false
        }

        this._token = t
        this._tokenRefresh = t2
        this._user_id = t3

        this._au = true
        return true
    }

    public logOut(): boolean {
        this._storage.del('token')
        this._storage.del('refresh')
        this._storage.del('user')
        return true
    }

    public async send(type: string, path: string, params: any): Promise<AllApiResp | ErrorApiResp | undefined> {
        try {
            const resp = await axios({
                url: `${this._url}${type}/${path}`,
                method: 'post',
                headers: type !== 'public' ? { Authorization: `Bearer ${this._token}` } : {},
                data: params
            })

            if (resp.data.code && resp.data.code >= 400) {
                const resFull: AllApiResp = {
                    data: <ErrorApiResp>resp.data,
                    code: (<ErrorApiResp>resp.data).code
                }
                return resFull
            }

            const res = (<RespApi>resp.data)

            const resFull: AllApiResp = {
                data: res,
                code: 200
            }

            return resFull
        } catch (err) {
            console.error('err axios', err)

            console.log('CODE ', err)

            const errA: any = err // TODO

            console.log('HEADERS ', errA.response.headers)

            if (errA.response.status === 500) {
                return {
                    code: 500,
                    data: {
                        code: 500,
                        message: errA.response.headers['x-request-id']
                    }
                }
            }

            if (errA.response && errA.response.data) {
                if ((<ErrorApiResp>errA.response.data).code === 1002) { // TODO
                    // this.refreshToken()
                }

                const resFull: AllApiResp = {
                    data: <ErrorApiResp>errA.response.data,
                    code: (<ErrorApiResp>errA.response.data).code
                }
                return resFull
            }
            console.log('Error not found object err')

            return undefined
        }
    }

    public async sendEmailCode(email: string): Promise<OtherApiResp | ErrorApiResp | undefined> {
        const res = await this.send('public', 'auth.send_code', { email })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <OtherApiResp>((<AllApiResp>res).data)
    }

    public async getTokens(email: string, code: string): Promise<LoginApiResp | ErrorApiResp | undefined> {
        const res = await this.send('public', 'auth.login', { email, code })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        const resType = <LoginApiResp>(<AllApiResp>res).data

        resType.code = 200

        this._token = resType.access_token
        this._tokenRefresh = resType.refresh_token

        this._storage.save('token', resType.access_token)
        this._storage.save('refresh', resType.refresh_token)

        this._storage.save('user', '1')

        this._au = true

        return resType
    }

    public async refreshToken
        (user_id: string, refresh_token: string): Promise<LoginApiResp | ErrorApiResp | undefined> {
        const res = await this.send('public', 'auth.refresh_token', { user_id, refresh_token })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <LoginApiResp>(<AllApiResp>res).data
    }

    public async getAllMerchants(page: number = 0): Promise<MerchantApiResp[] | ErrorApiResp | undefined> {
        const limit = 50
        const offset = page * limit
        const res = await this.send('private', 'merchant.get', { offset, limit })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <MerchantApiResp[]>(<AllApiResp>res).data
    }

    public async getMerchantById(id: string): Promise<MerchantApiResp[] | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.get', { merchant_id: id })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <MerchantApiResp[]>(<AllApiResp>res).data
    }

    public async verifyDomain(merchant_id: string): Promise<OtherApiResp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.verifyDomain', { merchant_id })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <OtherApiResp>(<AllApiResp>res).data
    }

    public async createMerchant
        (name: string,
            description: string,
            domain: string,
            evm_withdraw_address: string,
            tron_withdraw_address: string | undefined
        ): Promise<MerchantApiResp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.create', {
            name,
            description,
            domain,
            evm_withdraw_address,
            tron_withdraw_address
        })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <MerchantApiResp>(<AllApiResp>res).data
    }

    public async updateMerchant
        (name: string,
            description: string | undefined,
            evm_withdraw_address: string | undefined,
            tron_withdraw_address: string | undefined,
            merchant_id: string,
            success_redirect_url: string | undefined,
            fail_redirect_url: string | undefined
        ): Promise<MerchantApiResp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.update', {
            name,
            description,
            evm_withdraw_address,
            tron_withdraw_address,
            merchant_id,
            success_redirect_url,
            fail_redirect_url
        })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <MerchantApiResp>(<AllApiResp>res).data
    }

    public async getMe(): Promise<UserApiResp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'user.me', {})

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <UserApiResp>(<AllApiResp>res).data
    }

    public async genKey(merchant_id: string): Promise<GenKeyApiResp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.generateSigningKey', { merchant_id })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <GenKeyApiResp>(<AllApiResp>res).data
    }

    public async setWebhook
        (merchant_id: string, webhook_url: string): Promise<OtherApiResp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.setWebhook', { merchant_id, webhook_url })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <OtherApiResp>(<AllApiResp>res).data
    }

    public async merchantDel
        (merchant_id: string): Promise<OtherApiResp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.delete', { merchant_id })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <OtherApiResp>(<AllApiResp>res).data
    }

    public async createPayment
        (merchant_id: string,
            description: string,
            asset: string,
            asset_amount: string,
            evm_withdraw_address: string | undefined,
            tron_withdraw_address: string | undefined): Promise<PaymentApiREsp | ErrorApiResp | undefined> {
        const res = await this.send('private', 'payment.create', {
            merchant_id,
            description,
            asset,
            asset_amount,
            evm_withdraw_address,
            tron_withdraw_address
        })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <PaymentApiREsp>(<AllApiResp>res).data
    }

    public async getPaymentsFromMerchant(merchant_id: string): Promise<PaymentApiREsp[] | ErrorApiResp | undefined> {
        const res = await this.send('private', 'payment.get', { merchant_id })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <PaymentApiREsp[]>(<AllApiResp>res).data
    }

    public async getWebhook(merchant_id: string): Promise<WebhookResp[] | ErrorApiResp | undefined> {
        const res = await this.send('private', 'merchant.webhook.get', { merchant_id })

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <WebhookResp[]>(<AllApiResp>res).data
    }

    public async getAssets(): Promise<AssetsResp | ErrorApiResp | undefined> {
        const res = await this.send('public', 'payment.assets.get', {})

        if (!res) {
            return undefined
        }

        if (res.code !== 200) {
            return <ErrorApiResp>(<AllApiResp>res).data
        }

        return <AssetsResp>(<AllApiResp>res).data
    }
}
