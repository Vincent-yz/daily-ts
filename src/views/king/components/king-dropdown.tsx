import { useRegion, useTrainer } from '@/api/king';
import { Dropdown, DropdownRef, Space, Radio } from 'antd-mobile';
import React, { FC, useRef } from 'react';
import { useMatch, useNavigate } from 'react-router';
import i18n from '@/utils/i18n';

type KingDropDownProps = {
	activeRegion?: string;
	activeTrainer?: string;
}

const KingDropdown: FC<KingDropDownProps> = (props) => {
	const { activeRegion, activeTrainer } = props;
  const navigate = useNavigate();
	const { data: region = [] } = useRegion();
	const { data: trainer = [] } = useTrainer(activeRegion);

	const ref = useRef<DropdownRef>(null);

	const onRegionChange = (v: any) => {
		ref.current?.close();
		navigate(`/king/${v}`, {replace: true});
	}

	const onTrainerChange = (v: any) => {
		ref.current?.close();
		navigate(`/king/${activeRegion}/trainer/${v}`, {replace: true});
	}

	const matchRegion = useMatch('/king/*');
	const matchTrainer = useMatch('/king/:regionId/trainer/:trainerId');
	const regionTitle = region?.find(item => item.en_name === activeRegion);
	const trainerTitle = trainer?.find(item => item.id === activeTrainer);

	return (
		<Dropdown ref={ref}>
			{matchRegion ?
				<Dropdown.Item key="region" title={`region: ${i18n.transfer(regionTitle)}`}>
					<div style={{padding: 12}}>
						<Radio.Group value={activeRegion} onChange={onRegionChange}>
							<Space direction="vertical">
								{region.map(item =>
									<Radio key={item.en_name} value={item.en_name}>
										{i18n.transfer(item)}
									</Radio>
								)}
							</Space>
						</Radio.Group>
					</div>
				</Dropdown.Item> :
				null
			}
			{matchTrainer ?
				<Dropdown.Item key="trainer" title={`trainer: ${i18n.transfer(trainerTitle)}`}>
					<div style={{padding: 12}}>
						<Radio.Group value={activeTrainer} onChange={onTrainerChange}>
							<Space direction="vertical">
								{trainer.map(item =>
									<Radio key={item.en_name} value={item.id}>
										{i18n.transfer(item)}
									</Radio>
								)}
							</Space>
						</Radio.Group>
					</div>
				</Dropdown.Item> :
				null
			}
		</Dropdown>
	)
}

export default KingDropdown;
