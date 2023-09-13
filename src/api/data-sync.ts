import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

export const usePmData = (num:number) => {
  const res = useSWR(`https://pokeapi.co/api/v2/pokemon/${num}`, fetcher);

  return res.data;
}


