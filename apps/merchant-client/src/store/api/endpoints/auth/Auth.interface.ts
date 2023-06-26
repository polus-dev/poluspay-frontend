export interface IAuthRequestSendCode {
  email: string;
}

export interface IAuthRequestLogin extends IAuthRequestSendCode {
  code: number;
}

export interface IAuthResponseLogin {
  access_token: string;
  refresh_token: string;
}

export interface IAuthRequestRefresh {
  user_id: string;
  refresh_token: string;
}

export interface IAuthRequestNonce {
  address: string;
}

export interface IAuthResponseNonce {
  message: string;
}

export interface IAuthWalletLogin {
  address: string;
  signature: string;
}
