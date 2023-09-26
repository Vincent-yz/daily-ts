import request from '@/utils/request';
import useSWR, { Fetcher, Key, SWRResponse } from 'swr';

export type IPlayerCondition = {
	national_num: string;
	ability?: string;
	item?: string;
	move: string[];
}

export type IPlayerFilter = {
	national_num: string;
	name: string;
	ability: string[];
	item: string[];
	move: string[];
	count: number;
}

export type IPlayer = {
	id: string;
	trainer_id: string;
	team_id: string;
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

export type ITeam = {
	id: string;
	trainer_id: string;
	num: number;
	players: IPlayer[];
}

type IMixedPlayerFilter = {
	players: IPlayerFilter[];
	available_teams: string[];
}

type IUsePlayerFilter = {
	(trainerId: string | any, condition: IPlayerCondition[]): SWRResponse<IMixedPlayerFilter>;
}

type IUseTeam = {
	(trainerId: string | any): SWRResponse<ITeam[]>;
}

export const usePlayerFilter: IUsePlayerFilter = (trainerId, condition) => {
	const key: Key = trainerId ? [`/king/${trainerId}/team/filter`, condition] : null;
	const fetcher = async (
		[url, condition]: [string, IPlayerCondition[]]
	) => {
		const res = await request.post(url, condition);
		return res.data.data;
	}

	return useSWR(key, fetcher);
}

export const useTeam: IUseTeam = (trainerId) => {
	const key: Key = trainerId ? `/king/${trainerId}/team` : null;
	const fetcher: Fetcher<ITeam[], string> = async (url) => {
		const res = await request.get(url);
		return res.data.data;
	}

	return useSWR(key, fetcher);
}
