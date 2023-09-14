import request from '@/utils/request';

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
