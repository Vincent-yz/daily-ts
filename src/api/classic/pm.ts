import request, { IPagination } from '@/utils/request';
import useSWR, { Key, Fetcher, SWRResponse } from 'swr';
import useSWRInfinite, { SWRInfiniteKeyLoader, SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite';

export type IBaseStats = {
  hp: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
}

export type Pokemon = {
  national_num: number;
  en_name: string;
  ch_name: string;
  type1: string;
  type2: string;
  generation: number;
  height: number;
  weight: number;
  gender: string;
  ability1: string;
  ability2: string;
  ability3: string;
  egg_group1: string;
  egg_group2: string;
  catch_rate: number;
  base_stats: IBaseStats;
  total_stats: number;
}

type IUsePmList = {
  (keyword: string, type1: string, type2: string, generation: string): SWRInfiniteResponse<IPagination<Pokemon>>;
}

type IUsePmDetail = {
	(nationalNum: string | any): SWRResponse<Pokemon>;
}

type IUseAbilityPmList = {
  (enName?: string): SWRInfiniteResponse<IPagination<Pokemon>>;
}

export const usePmList: IUsePmList = (keyword = '', type1 = '', type2 = '', generation = '0') => {
  const key: SWRInfiniteKeyLoader = (index, previousPageData) => {
    if (previousPageData && !previousPageData.items.length) return null;
    return `/classic/pokemon?currentPage=${index + 1}&keyword=${keyword}&type1=${type1}&type2=${type2}&generation=${generation}`;
  }
  const fetcher: Fetcher<IPagination<Pokemon>, string> = async (url) => {
    const res = await request.list<Pokemon>(url);
    return res.data.data;
  }
  const config: SWRInfiniteConfiguration = {
    revalidateFirstPage: false,
  }

  return useSWRInfinite(key, fetcher, config);
}

export const usePmDetail: IUsePmDetail = (nationalNum) => {
  const key: Key = nationalNum ? `/classic/pokemon/${nationalNum}` : null;
  const fetcher: Fetcher<Pokemon, string> = async (url) => {
    const res = await request.get(url);
    return res.data.data;
  }

  return useSWR(key, fetcher);
}

export const useAbilityPmList: IUseAbilityPmList = (enName) => {
  const key: SWRInfiniteKeyLoader = (index, previousPageData) => {
    if (previousPageData && !previousPageData.items.length) return null;
    if (!enName) return null;
    return `/classic/ability/${enName}/pokemon?currentPage=${index + 1}`;
  }
  const fetcher: Fetcher<IPagination<Pokemon>, string> = async (url) => {
    const res = await request.list<Pokemon>(url);
    return res.data.data;
  }
  const config: SWRInfiniteConfiguration = {
    revalidateFirstPage : false,
  }

  return useSWRInfinite(key, fetcher, config);
}
