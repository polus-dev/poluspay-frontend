export interface IMerchantId {
    merchant_id: string;
}

export interface IMerchant {
    created_at: string;
    description: string;
    display_name: string;
    id: string;
    domain: string;
    domain_confirmation_code: string;
    fail_redirect_url: string;
    is_domain_confirmed: true;
    verified_at: string | null;
    is_signing_key_generated: true;
    logo: string;
    logo_status: LogoStatus;
    name: string;
    signing_key: string;
    success_redirect_url: string;
    webhook_url: string;
}

export type LogoStatus = 'on_moderation' | 'declined' | 'confirmed' | null;

export interface IPaymentMerchant
    extends Pick<
        IMerchant,
        | 'description'
        | 'display_name'
        | 'domain'
        | 'fail_redirect_url'
        | 'id'
        | 'is_domain_confirmed'
        | 'logo'
        | 'success_redirect_url'
        | 'verified_at'
    > {}
