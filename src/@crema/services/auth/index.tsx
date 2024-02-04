import axios from '@crema/services/axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AppStore } from '@/redux/appStore';
import { signInSuccess } from '@/redux/slices/userSlice';
import { ApiResponse } from '@/redux/types';

export const jwtAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

jwtAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  const { accessToken } = AppStore.getState().user;
  if (accessToken) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

jwtAxios.interceptors.response.use(
  (res: AxiosResponse<any, any>) => res,
  async (error: AxiosError | any) => {
    if (error.response && error.response.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const { refreshToken, currentUser } = AppStore.getState().user;
      if (!currentUser || !refreshToken) {
        return Promise.reject(error);
      }
      try {
        const response: AxiosResponse<ApiResponse<{
          accessToken: string;
        }>> = await jwtAxios.post('/authentication/refresh-token', {
          refreshToken: AppStore.getState().user.refreshToken,
        });
        jwtAxios.defaults.headers.common.Authorization = `Bearer ${response.data.data.accessToken}`;
        AppStore.dispatch(signInSuccess({
          user: currentUser,
          accessToken: response.data.data.accessToken,
          refreshToken: refreshToken,
        }));
        return jwtAxios.request(error.config);
      } catch (err) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default jwtAxios;
