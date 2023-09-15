import request from '@/utils/request';
import useSWR, { Key, Fetcher } from 'swr';
import useSWRInfinite, { SWRInfiniteKeyLoader, SWRInfiniteConfiguration } from 'swr/infinite';

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

interface IUsePmDataParam {
  keyword?: string;
  typeId1?: string;
  typeId2?: string;
  generation?: string;
}

export const usePmData = (param: IUsePmDataParam) => {
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

  return useSWRInfinite<Pokemon[]>(key, fetcher, config);
}

export const usePmType = () => {
  const key: Key = '/classic/type';
  const fetcher: Fetcher<IPmType[]> = async (url: string) => {
    const res = await request.get(url);
    return res.data.data;
  }

  return useSWR<IPmType[]>(key, fetcher);
}
