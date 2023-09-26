import React, { FC } from 'react';
import { Dialog, Button } from 'antd-mobile';
import { IPlayerFilter } from '@/api/king/team';

type IDeepFilter = {
	visible: boolean;
	onSelectAbility: (player: IPlayerFilter, item?: string) => void;
	onSelectItem: (player: IPlayerFilter, item?: string) => void;
	onSelectMove: (player: IPlayerFilter, move: string, isAdd: Boolean) => void;
	target?: IPlayerFilter;
}

const DeepFilter: FC<IDeepFilter> = (props) => {
	const { visible, target, onSelectAbility, onSelectItem, onSelectMove } = props;

	return (
		<Dialog
			visible={visible}
			closeOnMaskClick={true}
			title="深度筛选"
			content={
				<>
					111
					<div>
						{target?.ability.map(ability =>
							<div key={ability}>
								<span>{ability}</span>
								<Button onClick={() => onSelectAbility(target, ability)}>有</Button>
							</div>
						)}
					</div>
					<div>
						{target?.item.map(item =>
							<div key={item}>
								<span>{item}</span>
								<Button onClick={() => onSelectItem(target, item)}>有</Button>
							</div>
						)}
					</div>
					<div>
						{target?.move.map(move =>
							<div key={move}>
								<span>{move}</span>
								<Button onClick={() => onSelectMove(target, move, true)}>有</Button>
							</div>
						)}
					</div>
				</>
			}
		/>
	)
}

export default DeepFilter;
