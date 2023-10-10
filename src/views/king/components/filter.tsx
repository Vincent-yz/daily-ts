import React, { FC, useEffect, useState } from 'react';
import { usePlayerFilter, IPlayerCondition, IPlayerFilter } from '@/api/king/team';
import DeepFilter from './deep-filter';
import { List, Button } from 'antd-mobile';
import styles from './filter.module.css';

type IFilterProps = {
	trainerId: string | any;
	onAvailableTeamChange: (teams: number[]) => void;
}

const blankCondition: IPlayerCondition = {
	national_num: '',
	exclude_ability: [],
	exclude_item: [],
	move: [],
	exclude_move: [],
}

const blankFilter: IPlayerFilter = {
	national_num: '',
	name: '',
	ability: {},
	item: {},
	move: {},
	count: 0,
}

const Filter: FC<IFilterProps> = (props) => {
	const { trainerId, onAvailableTeamChange } = props;
	const [tCondition, setTCondition] = useState<Record<string, IPlayerCondition[]>>({});
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
	const [selected, setSelected] = useState<IPlayerFilter>(blankFilter);

	const condition: IPlayerCondition[] = tCondition[trainerId] ?? [];
  const { data: mixedPlayerFilter } = usePlayerFilter(trainerId, condition);

	useEffect(() => {
		onAvailableTeamChange(mixedPlayerFilter?.available_teams ?? []);
		// eslint-disable-next-line
	}, [mixedPlayerFilter?.available_teams]);

	if (!mixedPlayerFilter) return null;

	const updateCondition = (target: IPlayerCondition) => {
		const nationalNum: string = target.national_num;
		const current = tCondition[trainerId] ?? [];
		const next = current.map(item => item.national_num === nationalNum ? target : item);
		setTCondition(map => {return {...map, [trainerId]: next}});
		setDialogVisible(false);
	}

	const selectPm = (filter: IPlayerFilter) => {
		const target: IPlayerCondition = {
			...blankCondition,
			national_num: filter.national_num,
		}
		const current = tCondition[trainerId] ?? [];
		const next = [...current, target];
		setTCondition(map => {return {...map, [trainerId]: next,}});
	}

	const unSelectPm = (filter: IPlayerFilter) => {
		const current = tCondition[trainerId] ?? [];
		const next = current.filter(item => item.national_num !== filter.national_num);
		setTCondition(map => {return {...map, [trainerId]: next,}});
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
								condition.findIndex(_c => _c.national_num === player.national_num) > -1 ?
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
				onUpdateCondition={updateCondition}
				target={selected}
				condition={condition}
				onClose={() => setDialogVisible(false)}
			/>
		</div>
	)
}

export default Filter;
