import request from '@/utils/request';
import useSWR, { Fetcher, Key, SWRResponse } from 'swr';

export type IPlayer = {
	id: string;
	trainer_id: string;
	team_num: number;
	national_num: string;
	name: string;
	type1: string;
	type2: string;
	ability: string;
	item: string;
	nature: string;
	moves: string[];
	remark: string;
}

type IUsePlayerUpdate = {
	(teamId: string | any, player: IPlayer): SWRResponse<boolean>;
}

export const usePlayerUpdate: IUsePlayerUpdate = (teamId, player) => {
	const key: Key = teamId ? [`/king/team/${teamId}/player`, player] : null;
	const fetcher: Fetcher<boolean, [string, IPlayer]> = async ([url, player]) => {
		const res = await request.put(url, player);
		return res.data.data;
	}

	return useSWR(key, fetcher);
}
