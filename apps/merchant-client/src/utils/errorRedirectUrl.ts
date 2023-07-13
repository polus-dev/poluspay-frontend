interface IParams {
    requestId?: string;
    text?: string;
    errorCode?: number;
    backRedirect?: string;
}

export function errorRedirectUrl({
    requestId,
    text,
    errorCode,
    backRedirect,
}: IParams) {
    const url = new URL('https://error-page-polus.netlify.app');
    if (requestId) url.searchParams.append('request_id', requestId);
    if (text) url.searchParams.append('text', text);
    if (errorCode) url.searchParams.append('status_code', errorCode.toString());
    if (backRedirect)
        url.searchParams.append(
            'back_redirect',
            encodeURIComponent(backRedirect)
        );
    return url.href;
}
