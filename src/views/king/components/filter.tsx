import React, { FC, useEffect, useState } from 'react';
import { usePlayerFilter, IPlayerCondition, IPlayerFilter } from '@/api/king/team';
import DeepFilter, { STATUS } from './deep-filter';
import { List, Button } from 'antd-mobile';
import styles from './filter.module.css';

type IFilterProps = {
	trainerId: string | any;
	// 应该有一些筛选回调？
	onAvailableTeamChange: (teams: number[]) => void;
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
			exclude_ability: [],
			exclude_item: [],
			move: [],
			exclude_move: [],
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

	const selectAbility = (player: IPlayerFilter, ability: string, status: number) => {
		const target: IPlayerCondition = {
			...dic[player.national_num],
			ability: undefined,
			exclude_ability: [...dic[player.national_num].exclude_ability],
		};
		if (status === STATUS.INCLUDE) {
			target.ability = ability;
		} else if (status === STATUS.EXCLUDE) {
			target.exclude_ability.push(ability);
		}
		updateCondition(player.national_num, target);
	}

	const selectItem = (player: IPlayerFilter, item: string, status: number) => {
		const target: IPlayerCondition = {
			...dic[player.national_num],
			item: undefined,
			exclude_item: [...dic[player.national_num].exclude_item],
		};
		if (status === STATUS.INCLUDE) {
			target.item = item;
		} else if (status === STATUS.EXCLUDE) {
			target.exclude_ability.push(item);
		}
		updateCondition(player.national_num, target);
	}

	const selectMove = (player: IPlayerFilter, move: string, status: number) => {
		const target: IPlayerCondition = {
			...dic[player.national_num],
			move: dic[player.national_num].move.filter(_m => _m !== move),
			exclude_move: dic[player.national_num].exclude_move.filter(_m => _m !== move),
		};
		if (status === STATUS.INCLUDE) {
			target.move.push(move);
		} else if (status === STATUS.EXCLUDE) {
			target.exclude_move.push(move);
		}
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
						<div className={styles.row}>
							<span className={styles.num}>{player.count}</span>
							<span className={styles.name}>{player.name}</span>
							{
								dic[player.national_num] ?
									<>
										<Button color="primary" size="small" onClick={() => deepSelectPm(player)}>高级</Button>
										<Button color="warning" size="small" onClick={() => unSelectPm(player)}>移除</Button>
									</> :
									<Button color="success" size="small" onClick={() => selectPm(player)}>选择</Button>
							}
						</div>
					</List.Item>
				))}
			</List>

			<DeepFilter
				visible={dialogVisible}
				onSelectAbility={selectAbility}
				onSelectItem={selectItem}
				onSelectMove={selectMove}
				target={selected}
				onClose={() => setDialogVisible(false)}
			/>
		</div>
	)
}

export default Filter;
