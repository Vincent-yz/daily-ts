import useSWR, { SWRResponse } from 'swr';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@/utils/fetcher';
import { IPokeListItem } from '@/components/poke-list';
import axios, { AxiosResponse } from 'axios';

interface BaseStats {
  hp: number;
  attack: number;
  defense: number;
  sp_attack: number;
  sp_defense: number;
  speed: number;
}

interface Pokemon {
  nationalNum: number;
  name: string;
  typeId1: string;
  typeId2: string;
  abilityId1: string;
  abilityId2: string;
  abilityId3: string;
  baseStats: BaseStats;
}

const getKey = () => {
  return (pageIndex: number, previousPageData: any[] ):string | null => {
    if (previousPageData && !previousPageData.length) return null // 已经到最后一页
    return `/classic/pokemon`;
  }
}

export const usePmData = (
  currentPage: number,
  pageSize?: number,
  typeId1?: string,
  typeId2?: string,
  keyword?: string,
  generation?: number
) => {
  const res = useSWRInfinite(getKey, (url: string) => {
    return axios({
      method: 'get',
      url: url,
      params: {
        currentPage,
        pageSize,
        typeId1,
        typeId2,
        keyword,
        generation,
      }
    }).then(res => {
      return res.data.items;
    });
  });

  return res;
}
