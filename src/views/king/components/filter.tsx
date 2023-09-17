import React, { FC } from 'react';

type IFilterProps = {
	trainerId: string | any;
	// 应该有一些筛选回调？
}

const Filter: FC<IFilterProps> = (props) => {
	const { trainerId } = props;

	return (
		<div>filter</div>
	)
}

export default Filter;
