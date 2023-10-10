import LOCATE from "./utils/locate";

type IConfig = {
  baseUrl: string;
  locate: LOCATE;
}

const config: IConfig = {
  // 基础请求路径
  // baseUrl: 'http://localhost:8080',
  // baseUrl: 'http://10.11.33.12:8080',
  baseUrl: 'http://10.11.74.37:8080',
  // 本地语
  locate: LOCATE.en as LOCATE,
}

export default config;
