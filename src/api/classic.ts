import request from '@/utils/request';
import useSWR, { StrictTupleKey } from 'swr';

// interface BaseStats {
//   hp: number;
//   attack: number;
//   defense: number;
//   sp_attack: number;
//   sp_defense: number;
//   speed: number;
// }

interface Pokemon {
  national_num: number;
  en_name: string;
  ch_name: string;
  type_id1: string;
  type_id2: string;
}

interface ServerResponse<T> {
  currentPage: number;
  pageSize: number;
  total: number;
  items: T[];
}

interface IPmType {
  en_name: string;
  ch_name: string;
  color: string;
}

export function usePmData(args:(string | number | any)[]): Promise<ServerResponse<Pokemon>> {
  const [url, currentPage, queryParam] = args;
  return request({
    method: 'get',
    url: url,
    params: {
      currentPage,
      ...queryParam,
    }
  });
}

interface IUsePmDataParam {
  url: string;
  currentPage: number;
  queryParam?: object;
}

export const usePmDatas = (param: IUsePmDataParam) => {
  const { url, currentPage, queryParam = {} } = param;
  // return useSWR<Pokemon[]>([url, currentPage, queryParam], (..._args: any[]) => {
  //   // const [ url, currentPage, queryParam = {} ] = args;
  // });
}

export const usePmType = () => {
  return useSWR<IPmType[]>('/classic/type', request);
}
