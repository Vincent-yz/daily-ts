import React, { FC } from 'react'
import { LightFormItem } from '@/components/light-form';

import { IBaseStats } from '@/api/classic';

type IBaseStatsProps = {
  data: IBaseStats;
  total: number;
}

const BaseStats: FC<IBaseStatsProps> = (props) => {
  const { data, total } = props;
  return (
    <>
      <LightFormItem label="hp">{data.hp}</LightFormItem>
      <LightFormItem label="attack">{data.attack}</LightFormItem>
      <LightFormItem label="defense">{data.defense}</LightFormItem>
      <LightFormItem label="sp_attack">{data.sp_attack}</LightFormItem>
      <LightFormItem label="sp_defense">{data.sp_defense}</LightFormItem>
      <LightFormItem label="speed">{data.speed}</LightFormItem>
      <LightFormItem label="total">{total}</LightFormItem>
    </>
  );
}

export default BaseStats;