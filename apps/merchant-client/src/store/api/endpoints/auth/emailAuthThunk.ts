import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IAuthResponseLogin } from './Auth.interface';

interface IPayload {
  email: string;
  code?: string;
}

export const emailAuthThunk = createAsyncThunk(
  'users/emailAuthThunk',
  async (payload: IPayload) => {
    const apiUrl =
      import.meta.env.VITE_REACT_APP_BASE_URL + 'public' + '/auth';
    if (!payload.code) {
      const { email } = payload;
      await axios.post(apiUrl + '.send_code', {
        email,
      });
    } else {
      const {
        data: { access_token, refresh_token },
      } = await axios.post<IAuthResponseLogin>(apiUrl + '.login', {
        ...payload,
      });

      return { access_token, refresh_token };
    }
  }
);
