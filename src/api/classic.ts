import request from '@/utils/request';
import useSWR, { Key } from 'swr';

interface Pokemon {
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
  currentPage: number;
  typeId1?: string;
  typeId2?: string;
  keyword?: string;
  generation?: string;
}

export const usePmData = (param: IUsePmDataParam) => {
  const { currentPage, typeId1 = '', typeId2 = '', keyword = '', generation = '0' } = param;
  const key: Key = `/classic/pokemon?currentPage=${currentPage}&typeId1=${typeId1}&typeId2=${typeId2}&keyword=${keyword}&generation=${generation}`;

  return useSWR<Pokemon[]>(key, async (url: string) => {
    const res = await request.get<Pokemon[]>(url);
    return res.data.data.items;
  });
}

export const usePmType = () => {
  return useSWR<IPmType[]>('/classic/type', async (url: string) => {
    const res = await request.get<IPmType[]>(url);
    return res.data.data;
  });
}
