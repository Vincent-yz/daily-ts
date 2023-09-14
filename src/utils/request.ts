import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Toast } from 'antd-mobile';

interface IServiceResponse {
  code: number;
  message: string;
  data: number | string | any[] | Map<string, any> | any;
}

const customAxios:AxiosRequestConfig = {
  baseURL: 'http://localhost:8080',
  withCredentials: false,
  timeout: 30000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
  },
}

const service:AxiosInstance = axios.create(customAxios);

service.interceptors.request.use(
  (config:InternalAxiosRequestConfig) => {
    // 加登录态信息
    return config;
  },
  (error:AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response:AxiosResponse) => {
    // 这里是请求层的，包括header等参数
    const res = response.data;
    // 处理服务端的框架响应code/message等
    if (res.data !== undefined) {
      return res.data;
    }

    return res;
  },
  (error:AxiosError) => {
    let message = error.message;
    // if (error && error.response) {

    // }
    console.log('err:' + error);
    Toast.show({
      content: message,
      icon: 'fail',
    });
    return Promise.reject(error);
  }
);

export default service;
