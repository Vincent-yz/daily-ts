import request, { IPagination } from '@/utils/request';
import useSWR, { Key, Fetcher, SWRResponse } from 'swr';
import useSWRInfinite, { SWRInfiniteKeyLoader, SWRInfiniteConfiguration, SWRInfiniteResponse } from 'swr/infinite';

export type IPmAbility = {
  en_name: string;
  ch_name: string;
  short_effect: string;
  effect: string;
  flavor: string;
}

type IUsePmAbility = {
  (enName?: string): SWRResponse<IPmAbility>
}

type IUseAbilityList = {
  (keyword: string): SWRInfiniteResponse<IPagination<IPmAbility>>;
}

export const usePmAbility: IUsePmAbility = (enName = '') => {
  const key: Key = enName ? `/classic/ability/${enName}` : null;
  const fetcher: Fetcher<IPmAbility, string> = async (url) => {
    const res = await request.get(url);
    return res.data.data;
  }

  return useSWR(key, fetcher);
}

export const useAbilityList: IUseAbilityList = (keyword = '') => {
  const key: SWRInfiniteKeyLoader = (index, previousPageData) => {
    if (previousPageData && !previousPageData.items.length) return null;
    return `/classic/ability?currentPage=${index + 1}&keyword=${keyword}`;
  }
  const fetcher: Fetcher<IPagination<IPmAbility>, string> = async (url) => {
    const res = await request.list<IPmAbility>(url);
    return res.data.data;
  }
  const config: SWRInfiniteConfiguration = {
    revalidateFirstPage : false,
  }

  return useSWRInfinite(key, fetcher, config);
}
