import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { APIResponse } from './types';
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process?.env?.NEXT_PUBLIC_API_URL as string,
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json'
    }
});
axiosInstance.interceptors.request.use(
    (config: any): any => {
        const token = localStorage.getItem('custom-auth-token');
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: token,
            };
        }
        return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    (error: AxiosError): Promise<AxiosError> => {
        if (error.response) {
            if (error.response.status === 401) {
                localStorage.clear();
                window.location.href = '/';
            } else if(error?.response?.status === 500) {
            }
            // You can add more custom error handling based on status codes here
        }
        return Promise.reject(error);
    }
);

const handleError = (error: AxiosError): APIResponse => {
    const response = error?.response?.data as APIResponse;
    return response;
};

const get = async (url: string, config: AxiosRequestConfig = {}): Promise<APIResponse> => {
    try {
        const response: APIResponse = await axiosInstance.get(url, config);
        return response;
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

// const post = async (url: string, data: any, config: AxiosRequestConfig = {}): Promise<APIResponse> => {
//     try {
//         const response: APIResponse = await axiosInstance.post(url, data, config);
//         return response;
//     } catch (error) {
//         return handleError(error as AxiosError);
//     }
// };
const post = async (url: string, data: any, config: AxiosRequestConfig = {}): Promise<APIResponse> => {
    try {
        const response: AxiosResponse = await axiosInstance.post(url, data, config);
        return {
            status: response.status, // HTTP status code
            data: response.data, // Response payload
            message: response.statusText, // Status message
            statusText: response.statusText, // Optional, similar to message
        };
    } catch (error) {
        return handleError(error as AxiosError);
    }
};
// const post = async <TData, TResponse>(
//     url: string,
//     data: TData,
//     config: AxiosRequestConfig = {}
// ): Promise<TResponse> => {
//     try {
//         const response = await axiosInstance.post<TResponse>(url, data, config);
//         return response.data;
//     } catch (error) {
//         return handleError(error as AxiosError) as unknown as TResponse;
//     }
// };


const put = async (url: string, data: any, config: AxiosRequestConfig = {}): Promise<APIResponse> => {
    try {
        const response: APIResponse = await axiosInstance.put(url, data, config);
        return response;
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

const del = async (url: string, config: AxiosRequestConfig = {}): Promise<APIResponse> => {
    try {
        const response: APIResponse = await axiosInstance.delete(url, config);
        return response
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

export { get, post, put, del };
