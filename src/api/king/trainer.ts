import request from '@/utils/request';
import useSWR, { Fetcher, Key, SWRResponse } from 'swr';

type ITrainer = {
	id: string;
	region_id: string;
  en_name: string;
	ch_name: string;
	next: string;
	last: 0 | 1;
}

type IUseTrainer = {
	(regionId: string | any): SWRResponse<ITrainer[]>;
}

export const useTrainer: IUseTrainer = (regionId) => {
	const key: Key = regionId ? `/king/region/${regionId}/trainer` : null;
	const fetcher: Fetcher<ITrainer[], string> = async (url) => {
		const res = await request.get(url);
		return res.data.data;
	}

	return useSWR(key, fetcher);
}
