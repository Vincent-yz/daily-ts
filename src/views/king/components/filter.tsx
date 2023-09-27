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

  const { data: mixedPlayerFilter } = usePlayerFilter(trainerId, condition);

	useEffect(() => {
		onAvailableTeamChange(mixedPlayerFilter?.available_teams ?? []);
		// eslint-disable-next-line
	}, [mixedPlayerFilter?.available_teams]);

	if (!mixedPlayerFilter) return null;

	const updateCondition = (national_num: string, target: IPlayerCondition) => {
		setDic(current => {
			const newDic = {...current, [national_num]: target};
			return newDic;
		});
		setCondition(current => current.map(item => item.national_num === national_num ? target : item));
		setDialogVisible(false);
	}

	const selectPm = (filter: IPlayerFilter) => {
		const target: IPlayerCondition = {
			national_num: filter.national_num,
			exclude_ability: [],
			exclude_item: [],
			move: [],
			exclude_move: [],
		}
		setDic(current => {
			return {...current, [filter.national_num]: target};
		});
		setCondition(current => [...current, target]);
	}

	const unSelectPm = (filter: IPlayerFilter) => {
		setDic(current => {
			const copy = {...current};
			delete copy[filter.national_num];
			return copy;
		});
		setCondition(current => current.filter(item => item.national_num !== filter.national_num));
	}

	const selectAbility = (filter: IPlayerFilter, ability: string, status: number) => {
		const target: IPlayerCondition = {
			...dic[filter.national_num],
			ability: undefined,
			exclude_ability: [...dic[filter.national_num].exclude_ability],
		};
		if (status === STATUS.INCLUDE) {
			target.ability = ability;
		} else if (status === STATUS.EXCLUDE) {
			target.exclude_ability.push(ability);
		}
		updateCondition(filter.national_num, target);
	}

	const selectItem = (filter: IPlayerFilter, item: string, status: number) => {
		const target: IPlayerCondition = {
			...dic[filter.national_num],
			item: undefined,
			exclude_item: [...dic[filter.national_num].exclude_item],
		};
		if (status === STATUS.INCLUDE) {
			target.item = item;
		} else if (status === STATUS.EXCLUDE) {
			target.exclude_ability.push(item);
		}
		updateCondition(filter.national_num, target);
	}

	const selectMove = (filter: IPlayerFilter, move: string, status: number) => {
		const target: IPlayerCondition = {
			...dic[filter.national_num],
			move: dic[filter.national_num].move.filter(_m => _m !== move),
			exclude_move: dic[filter.national_num].exclude_move.filter(_m => _m !== move),
		};
		if (status === STATUS.INCLUDE) {
			target.move.push(move);
		} else if (status === STATUS.EXCLUDE) {
			target.exclude_move.push(move);
		}
		updateCondition(filter.national_num, target);
	}

	const deepSelectPm = (filter: IPlayerFilter) => {
		setDialogVisible(true);
		setSelected(filter);
	}

	return (
		<div>
			<List mode="card">
				{mixedPlayerFilter.players.map(player => (
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
