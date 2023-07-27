import axios from 'axios';
import { IAuthResponseLogin } from './Auth.interface';
import { StoragePolus } from '../../../../logic/storage';
const apiUrl = import.meta.env.VITE_API_URL + 'public' + '/auth.google';

interface GoogleRedirectResponse {
    redirect_url: string;
}
export const doGoogleRedirect = async () => {
    const response = await axios.post<GoogleRedirectResponse>(
        apiUrl + '.login'
    );
    window.location.replace(response.data.redirect_url);
};

export const doGoogleLogin = async () => {
    const params = new URLSearchParams(window.location.search);
    const paramsObject = Object.fromEntries(params.entries());
    const response = await axios.post<IAuthResponseLogin>(
        apiUrl + '.callback',
        paramsObject
    );
    const storage = new StoragePolus();
    storage.save('token', response.data.access_token);
    storage.save('refresh', response.data.refresh_token);
};
