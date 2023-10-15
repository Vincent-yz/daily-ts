import { useRegion, useTrainer } from '@/api/king';
import { Dropdown, DropdownRef, Space, Radio, Button } from 'antd-mobile';
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
	const { data: regionList = [] } = useRegion();
	const { data: trainerList = [] } = useTrainer(activeRegion);

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
	const region = regionList?.find(item => item.en_name === activeRegion);
	const trainer = trainerList?.find(item => item.id === activeTrainer);

	const next = () => {
		if (matchTrainer && region && trainer) {
			// const nextRegion: string = trainer?.last ? region?.en_name : region?.next;
			const nextTrainer: string = trainer?.next;
			navigate(`/king/${activeRegion}/trainer/${nextTrainer}`, {replace: true});
		} else if(region) {
			const nextRegion: string = region?.next;
			navigate(`/king/${nextRegion}`, {replace: true});
		}
	}

	return (
		<div style={{position: "relative"}}>
			<Dropdown ref={ref} style={{marginRight: "50px"}}>
				{matchRegion ?
					<Dropdown.Item key="region" title={`region: ${i18n.transfer(region)}`}>
						<div style={{padding: 12}}>
							<Radio.Group value={activeRegion} onChange={onRegionChange}>
								<Space direction="vertical">
									{regionList.map(item =>
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
					<Dropdown.Item key="trainer" title={`trainer: ${i18n.transfer(trainer)}`}>
						<div style={{padding: 12}}>
							<Radio.Group value={activeTrainer} onChange={onTrainerChange}>
								<Space direction="vertical">
									{trainerList.map(item =>
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
			<Button style={{position: "absolute", right: 0, top: 10}} size="mini" fill="none" onClick={next}>next</Button>
		</div>
	)
}

export default KingDropdown;
