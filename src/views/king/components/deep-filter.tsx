import React, { FC, ReactNode } from 'react';
import { Dialog, Button } from 'antd-mobile';
import { IPlayerCondition, IPlayerFilter } from '@/api/king/team';
import styles from './deep-filter.module.css';

enum STATUS {
	PENDING = 0,
	INCLUDE = 1,
	EXCLUDE = -1,
}

type DeepFilterProps = {
	visible: boolean;
	onUpdateCondition: (condition: IPlayerCondition) => void;
	target?: IPlayerFilter;
	condition: IPlayerCondition[];
	onClose: () => void;
}

type FilterRowProps = {
	onClick: (s: STATUS) => void;
	status: STATUS;
	children: ReactNode;
	className?: string;
}

const blankCondition: IPlayerCondition = {
	national_num: '',
	exclude_ability: [],
	exclude_item: [],
	move: [],
	exclude_move: [],
}

const FilterRow: FC<FilterRowProps> = (props) => {
	const { onClick, status, children, className } = props;

	return (
		<div className={className}>
			<span className={styles.rowName}>{children}</span>
			{status === STATUS.PENDING ?
				<>
					<Button color="success" size="small" onClick={() => onClick(STATUS.INCLUDE)} children="有" />
					<Button color="danger" size="small" onClick={() => onClick(STATUS.EXCLUDE)} children="没有" />
				</> :
				<Button color="default" size="small" onClick={() => onClick(STATUS.PENDING)} children="恢复" />
			}
		</div>
	);
}

const DeepFilter: FC<DeepFilterProps> = (props) => {
	const { visible, onUpdateCondition, target, condition, onClose } = props;

	if (!target) return null;

	const selectAbility = (ability: string, status: number) => {
		const current: IPlayerCondition = condition.find(cItem => cItem.national_num === target.national_num) ?? blankCondition;
		const next: IPlayerCondition = {
			...current,
			ability: undefined,
			exclude_ability: [...current.exclude_ability],
		};
		if (status === STATUS.INCLUDE) {
			next.ability = ability;
		} else if (status === STATUS.EXCLUDE) {
			next.exclude_ability.push(ability);
		}
		onUpdateCondition(next);
	}

	const selectItem = (item: string, status: number) => {
		const current: IPlayerCondition = condition.find(cItem => cItem.national_num === target.national_num) ?? blankCondition;
		const next: IPlayerCondition = {
			...current,
			item: undefined,
			exclude_item: [...current.exclude_item],
		};
		if (status === STATUS.INCLUDE) {
			next.item = item;
		} else if (status === STATUS.EXCLUDE) {
			next.exclude_ability.push(item);
		}
		onUpdateCondition(next);
	}

	const selectMove = (move: string, status: number) => {
		const current: IPlayerCondition = condition.find(cItem => cItem.national_num === target.national_num) ?? blankCondition;
		const next: IPlayerCondition = {
			...current,
			move: current.move.filter(_m => _m !== move),
			exclude_move: current.exclude_move.filter(_m => _m !== move),
		};
		if (status === STATUS.INCLUDE) {
			next.move.push(move);
		} else if (status === STATUS.EXCLUDE) {
			next.exclude_move.push(move);
		}
		onUpdateCondition(next);
	}

	return (
		<Dialog
			visible={visible}
			closeOnMaskClick={true}
			onClose={onClose}
			title="深度筛选"
			content={
				<div className={styles.wrapper}>
					{Object.entries(target.ability).map(([ability, status]) =>
						<FilterRow
							key={ability}
							onClick={(s) => selectAbility(ability, s)}
							status={status}
							children={ability}
							className={styles.ability}
						/>
					)}
					{Object.entries(target.item).map(([item, status]) =>
						<FilterRow
							key={item}
							onClick={(s) => selectItem(item, s)}
							status={status}
							children={item}
							className={styles.item}
						/>
					)}
					{Object.entries(target.move).map(([move, status]) =>
						<FilterRow
							key={move}
							onClick={(s) => selectMove(move, s)}
							status={status}
							children={move}
							className={styles.move}
						/>
					)}
				</div>
			}
		/>
	)
}

export { STATUS };
export default DeepFilter;
