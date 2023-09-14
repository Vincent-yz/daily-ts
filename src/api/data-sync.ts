import useSWR from 'swr';
import fetcher from '@/utils/request';

export const usePmData = (num:number) => {
  const res = useSWR(`https://pokeapi.co/api/v2/pokemon/${num}`, fetcher);

  return res.data;
}


