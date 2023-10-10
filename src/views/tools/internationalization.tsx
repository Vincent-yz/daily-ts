import React from 'react';
import i18n from '@/utils/i18n';
import LOCATE from '@/utils/locate';
import { Radio } from 'antd-mobile';
import useLayoutContext from '@/layout/layout-context';

const Internationalization = () => {
	const { changeLocate } = useLayoutContext();
	const onChange: (e: any) => void = (e) => {
		i18n.set(e);
		changeLocate();
	}

	return (
		<Radio.Group onChange={onChange} defaultValue={i18n.get()}>
			{Object.entries(LOCATE).map(([k, v]) =>
				<Radio key={k} value={v}>{v}</Radio>
			)}
		</Radio.Group>
	)
}

export default Internationalization;
