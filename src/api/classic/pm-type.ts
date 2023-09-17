import request from '@/utils/request';
import useSWR, { Key, Fetcher, SWRResponse } from 'swr';

type IPmType = {
  en_name: string;
  ch_name: string;
  color: string;
  label?: string;
  value?: string;
}

type IUsePmType = {
  (): SWRResponse<IPmType[]>
}

export const usePmType: IUsePmType = () => {
  const key: Key = '/classic/type';
  const fetcher: Fetcher<IPmType[]> = async (url: string) => {
    const res = await request.get(url);
    return res.data.data;
  }

  return useSWR(key, fetcher);
}
