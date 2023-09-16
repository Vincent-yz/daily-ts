import request from '@/utils/request';
import useSWR, { Key, Fetcher, SWRResponse } from 'swr';
import useSWRInfinite, { SWRInfiniteKeyLoader, SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite';

export interface Pokemon {
  national_num: number;
  en_name: string;
  ch_name: string;
  type_id1: string;
  type_id2: string;
}

interface IPmType {
  en_name: string;
  ch_name: string;
  color: string;
  label?: string;
  value?: string;
}

interface IUsePmListParam {
  keyword?: string;
  typeId1?: string;
  typeId2?: string;
  generation?: string;
}

interface IUsePmList {
  (param: IUsePmListParam): SWRInfiniteResponse<Pokemon[]>
}

interface IUsePmType {
  (): SWRResponse<IPmType[]>
}

export const usePmList: IUsePmList = (param) => {
  const { keyword = '', typeId1 = '', typeId2 = '', generation = '0' } = param;
  const key: SWRInfiniteKeyLoader = (index, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;
    return `/classic/pokemon?currentPage=${index + 1}&keyword=${keyword}&typeId1=${typeId1}&typeId2=${typeId2}&generation=${generation}`;
  }
  const fetcher: Fetcher<Pokemon[]> = async (url: string) => {
    const res = await request.get(url);
    return res.data.data.items;
  }
  const config: SWRInfiniteConfiguration = {
    revalidateFirstPage : false,
  }

  return useSWRInfinite(key, fetcher, config);
}

export const usePmDetail = (nationalNum: string | number | any) => {
  const key: Key = `/classic/pokemon/${nationalNum}`;
  const fetcher: Fetcher<Pokemon[]> = async (url: string) => {
    const res = await request.get(url);
    return res.data.data;
  }

  return useSWR<Pokemon[]>(nationalNum ? key : null, fetcher);
}

export const usePmType: IUsePmType = () => {
  const key: Key = '/classic/type';
  const fetcher: Fetcher<IPmType[]> = async (url: string) => {
    const res = await request.get(url);
    return res.data.data;
  }

  return useSWR(key, fetcher);
}
