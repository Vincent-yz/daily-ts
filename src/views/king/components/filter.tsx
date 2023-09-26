import React, { FC, useEffect, useState } from 'react';
import { usePlayerFilter, IPlayerCondition, IPlayerFilter } from '@/api/king/team';
import DeepFilter from './deep-filter';
import { List } from 'antd-mobile';

type IFilterProps = {
	trainerId: string | any;
	// 应该有一些筛选回调？
	onAvailableTeamChange: (teams: string[]) => void;
}

const Filter: FC<IFilterProps> = (props) => {
	const { trainerId, onAvailableTeamChange } = props;
	const [condition, setCondition] = useState<IPlayerCondition[]>([]);
	const [dic, setDic] = useState<Record<string, IPlayerCondition>>({});
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [selected, setSelected] = useState<IPlayerFilter>();

  const { data: filter } = usePlayerFilter(trainerId, condition);

	useEffect(() => {
		onAvailableTeamChange(filter?.available_teams ?? []);
	}, [filter?.available_teams]);

	if (!filter) return null;

	const updateCondition = (national_num: string, target: IPlayerCondition) => {
		setDic(current => {
			const newDic = {...current, [national_num]: target};
			return newDic;
		});
		setCondition(current => current.map(item => item.national_num === national_num ? target : item));
		setDialogVisible(false);
	}

	const selectPm = (player: IPlayerFilter) => {
		const target: IPlayerCondition = {
			national_num: player.national_num,
			move: [],
		}
		setDic(current => {
			return {...current, [player.national_num]: target};
		});
		setCondition(current => [...current, target]);
	}

	const unSelectPm = (player: IPlayerFilter) => {
		setDic(current => {
			const copy = {...current};
			delete copy[player.national_num];
			return copy;
		});
		setCondition(current => current.filter(item => item.national_num !== player.national_num));
	}

	const selectAbility = (player: IPlayerFilter, ability?: string) => {
		const target: IPlayerCondition = {...dic[player.national_num], ability};
		updateCondition(player.national_num, target);
	}

	const selectItem = (player: IPlayerFilter, item?: string) => {
		const target: IPlayerCondition = {...dic[player.national_num], item};
		updateCondition(player.national_num, target);
	}

	const selectMove = (player: IPlayerFilter, move: string, isAdd: Boolean) => {
		const target: IPlayerCondition = {...dic[player.national_num]};
		target.move = isAdd ?
			[...target.move, move] :
			target.move.filter(_m => _m !== move);
		updateCondition(player.national_num, target);
	}

	const deepSelectPm = (player: IPlayerFilter) => {
		setDialogVisible(true);
		setSelected(player);
	}

	return (
		<div>
			<div>filter</div>

			<List mode="card">
				{filter.players.map(player => (
					<List.Item key={player.national_num}>
						<span>{player.count}</span>
						<span>{player.name}</span>
						{
							dic[player.national_num] ?
								<>
									<button onClick={() => deepSelectPm(player)}>高级</button>
									<button onClick={() => unSelectPm(player)}>移除</button>
								</> :
								<button onClick={() => selectPm(player)}>选择</button>
						}
					</List.Item>
				))}
			</List>

			<DeepFilter
				visible={dialogVisible}
				onSelectAbility={selectAbility}
				onSelectItem={selectItem}
				onSelectMove={selectMove}
				target={selected}
			/>
		</div>
	)
}

export default Filter;
