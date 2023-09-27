import React, { FC, ReactNode } from 'react';
import { Dialog, Button } from 'antd-mobile';
import { IPlayerFilter } from '@/api/king/team';
import styles from './deep-filter.module.css';

enum STATUS {
	PENDING = 0,
	INCLUDE = 1,
	EXCLUDE = -1,
}

type DeepFilterProps = {
	visible: boolean;
	onSelectAbility: (player: IPlayerFilter, ability: string, status: STATUS) => void;
	onSelectItem: (player: IPlayerFilter, item: string, status: STATUS) => void;
	onSelectMove: (player: IPlayerFilter, move: string, status: STATUS) => void;
	target?: IPlayerFilter;
	onClose: () => void;
}

type FilterRowProps = {
	onClick: (s: STATUS) => void;
	status: STATUS;
	children: ReactNode;
	className?: string;
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
	const { visible, onSelectAbility, onSelectItem, onSelectMove, target, onClose } = props;

	if (!target) return null;

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
							onClick={(s) => onSelectAbility(target, ability, s)}
							status={status}
							children={ability}
							className={styles.ability}
						/>
					)}
					{Object.entries(target.item).map(([item, status]) =>
						<FilterRow
							key={item}
							onClick={(s) => onSelectItem(target, item, s)}
							status={status}
							children={item}
							className={styles.item}
						/>
					)}
					{Object.entries(target.move).map(([move, status]) =>
						<FilterRow
							key={move}
							onClick={(s) => onSelectMove(target, move, s)}
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
