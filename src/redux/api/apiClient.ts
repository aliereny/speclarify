import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AppStore} from "@/redux/appStore";
import {ApiResponse} from "@/redux/types";
import {signInSuccess} from "@/redux/slices/userSlice";

export const ApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

ApiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const {accessToken} = AppStore.getState().user;
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

ApiClient.interceptors.response.use(
    (res: AxiosResponse<any, any>) => res,
    async (error: AxiosError | any) => {
        if (error.response && error.response.status === 401 && !error.config._retry) {
            error.config._retry = true;
            const {refreshToken, currentUser} = AppStore.getState().user;
            if (!currentUser || !refreshToken) {
                return Promise.reject(error);
            }
            try {
                const response: AxiosResponse<ApiResponse<{
                    accessToken: string;
                }>> = await ApiClient.post('/authentication/refresh-token', {
                    refreshToken: AppStore.getState().user.refreshToken,
                });
                ApiClient.defaults.headers.common.Authorization = `Bearer ${response.data.data.accessToken}`;
                AppStore.dispatch(signInSuccess({
                    user: currentUser,
                    accessToken: response.data.data.accessToken,
                    refreshToken: refreshToken,
                }));
                return ApiClient.request(error.config);
            } catch (err) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    },
);

