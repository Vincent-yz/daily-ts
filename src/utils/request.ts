import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { Toast } from 'antd-mobile';

export type IPagination<T> = {
  currentPage: number;
  pageSize: number;
  total: number;
  items: T[];
}

export type IResult<T> = {
  code: number;
  message: string;
  data: T;
}

class Request {
  instance: AxiosInstance;

  baseConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:8080',
    withCredentials: false,
    timeout: 30000,
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest',
    },
  }

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign({}, this.baseConfig, config));

    this.instance.interceptors.request.use(
      (reqConfig: InternalAxiosRequestConfig) => {
        // 加登录态信息
        return reqConfig;
      },
      (error: AxiosError) => {
        console.log(error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 这里是请求层的，包括header等参数
        // const res = response.data;
        // 处理服务端的框架响应code/message等
        // if (res.data !== undefined) {
        //   return res.data;
        // }

        return response;
      },
      (error: AxiosError) => {
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
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IResult<T>>> {
    return this.instance.get(url, config);
  }

  public list<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IResult<IPagination<T>>>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IResult<T>>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IResult<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IResult<T>>> {
    return this.instance.delete(url, config);
  }
}

const myRequest = new Request({});

export default myRequest;
