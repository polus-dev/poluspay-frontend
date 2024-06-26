export const enum ResponseApiCode {
    // auth 1xxx
    BadJsonBody = 1000,
    MissingOrMalformedJWT = 1001,
    InvalidOrExpiredJWT = 1002,
    InvalidEmail = 1003,
    AuthCodeNotAvailable = 1004,
    InvalidAuthCodeOrEmail = 1005,
    AuthCodeExpired = 1006,
    InvalidRefreshToken = 1007,
    ExpiredRefreshToken = 1008,
    InvalidRequestSignature = 1009,

    // payment 2xxx
    TooLongPaymentDescription = 2001,
    PaymentAssetCannotBeEmpty = 2002,
    WithdrawAddressesMustBeFilledOrEmptyBoth = 2003,
    PaymentAssetAmountTooSmall = 2004,
    PaymentDoesntExists = 2005,
    PaymentIDCannotBeEmpty = 2006,
    PaymentAssetNotFound = 2007,
    WithdrawAddressesCannotBeEmpty = 2008,
    InvalidPaymentBlockchain = 2009,
    PaymentNotPending = 2010,
    UnsupportedPaymentAssetForTron = 2011,
    SpecifiedPaymentBlockchainAlreadySpecified = 2012,

    // merchant 3xxx
    BadMerchantNameLength = 3001,
    BadMerchantDescriptionLength = 3002,
    BadMerchantNameAlreadyExists = 3003,
    BadMerchantDoesntExists = 3004,
    BadMerchantDomainAlreadyVerified = 3005,
    BadMerchantDomainCheckNotAvailable = 3006,
    BadMerchantDomainVerificationTxtNotFound = 3007,
    BadMerchantDomainVerificationLookupUnavailable = 3008,
    BadWebhook = 3009,
    BadMerchantDomainAlreadyExists = 3010,
    BadMerchantIDHeaderCannotBeEmpty = 3011,
    BadMerchantSignatureCannotBeEmpty = 3012,
    BadInvalidMerchantIDHeader = 3013,
    BadMerchantAPIUnavailable = 3014,

    // general validation 4xxx
    BadDomain = 4001,
    BadEvmAddress = 4002,
    BadTronAddress = 4003,
    BadURL = 4004,
    NothingToUpdate = 4005,

    // Self code
    InvalidUUID = 6001,
}
