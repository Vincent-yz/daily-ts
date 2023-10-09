import request from '@/utils/request';
import useSWR, { Fetcher, Key, SWRResponse } from 'swr';
import { IPlayer } from './player';

/**
 * 过滤条件
 */
export type IPlayerCondition = {
	national_num: string;
	ability?: string;
	exclude_ability: string[];
	item?: string;
	exclude_item: string[];
	move: string[];
	exclude_move: string[];
}

/**
 * 过滤器
 */
export type IPlayerFilter = {
	national_num: string;
	name: string;
	ability: Record<string, number>;
	item: Record<string, number>;
	move: Record<string, number>;
	count: number;
}

export type ITeam = {
	num: number;
	players: IPlayer[];
}

type IMixedPlayerFilter = {
	players: IPlayerFilter[];
	/**
	 * 筛选后的队伍编号
	 */
	available_teams: number[];
}

type IUsePlayerFilter = {
	(trainerId: string | any, condition: IPlayerCondition[]): SWRResponse<IMixedPlayerFilter>;
}

type IUseTeam = {
	(trainerId: string | any): SWRResponse<ITeam[]>;
}

export const usePlayerFilter: IUsePlayerFilter = (trainerId, condition) => {
	const key: Key = trainerId ? [`/king/trainer/${trainerId}/team/filter`, condition] : null;
	const fetcher: Fetcher<IMixedPlayerFilter, [string, IPlayerCondition[]]> = async (
		[url, body]
	) => {
		const res = await request.post(url, body);
		return res.data.data;
	}

	return useSWR(key, fetcher);
}

export const useTeam: IUseTeam = (trainerId) => {
	const key: Key = trainerId ? `/king/trainer/${trainerId}/team` : null;
	const fetcher: Fetcher<ITeam[], string> = async (url) => {
		const res = await request.get(url);
		return res.data.data;
	}

	return useSWR(key, fetcher);
}
