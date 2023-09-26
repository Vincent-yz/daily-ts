import React, { FC } from 'react';
import { Dialog, Button } from 'antd-mobile';
import { IPlayerFilter } from '@/api/king/team';
import styles from './deep-filter.module.css';

type IDeepFilter = {
	visible: boolean;
	onSelectAbility: (player: IPlayerFilter, item?: string) => void;
	onSelectItem: (player: IPlayerFilter, item?: string) => void;
	onSelectMove: (player: IPlayerFilter, move: string, isAdd: Boolean) => void;
	target?: IPlayerFilter;
	onClose: () => void;
}

const DeepFilter: FC<IDeepFilter> = (props) => {
	const { visible, onSelectAbility, onSelectItem, onSelectMove, target, onClose } = props;

	return (
		<Dialog
			visible={visible}
			closeOnMaskClick={true}
			onClose={onClose}
			title="深度筛选"
			content={
				<div className={styles.wrapper}>
					{target?.ability.map(ability =>
						<div className={styles.ability} key={ability}>
							<span className={styles.rowName}>{ability}</span>
							<Button color="success" size="small" onClick={() => onSelectAbility(target, ability)}>有</Button>
						</div>
					)}
					{target?.item.map(item =>
						<div className={styles.item} key={item}>
							<span className={styles.rowName}>{item}</span>
							<Button color="success" size="small" onClick={() => onSelectItem(target, item)}>有</Button>
						</div>
					)}
					{target?.move.map(move =>
						<div className={styles.move} key={move}>
							<span className={styles.rowName}>{move}</span>
							<Button color="success" size="small" onClick={() => onSelectMove(target, move, true)}>有</Button>
						</div>
					)}
				</div>
			}
		/>
	)
}

export default DeepFilter;
