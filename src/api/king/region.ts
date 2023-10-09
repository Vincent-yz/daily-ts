import request from '@/utils/request';
import useSWR, { Fetcher, Key, SWRResponse } from 'swr';

type IRegion = {
  en_name: string;
	ch_name: string;
	next: string;
}

type IUseRegion = {
	(): SWRResponse<IRegion[]>
}

export const useRegion: IUseRegion = () => {
	const key: Key = '/king/region';
	const fetcher: Fetcher<IRegion[], string> = async (url) => {
		const res = await request.get(url);
		return res.data.data;
	}

	return useSWR(key, fetcher);
}
