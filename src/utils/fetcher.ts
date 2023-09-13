import axios, { AxiosRequestConfig } from 'axios';

const fetcher = (config: AxiosRequestConfig) => axios(config);

export default fetcher;
