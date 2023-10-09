import request from '@/utils/request';

export type IPlayer = {
	id: string;
	// trainer_id: string;
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

type IPutPlayer = {
	(trainerId: string | any, player: IPlayer): Promise<boolean>;
}

export const putPlayer: IPutPlayer = async (trainerId, player) => {
	const url: string = `/king/trainer/${trainerId}/player`;
	return request.put(url, player).then(res => res.data.data);
}
