import React, { FC } from 'react';
import { Tag } from 'antd-mobile';
import { usePmType } from '@/api/classic';
import transfer from '@/utils/i18n';

type IPmTypeProps = {
  id: string;
}

const PmType:FC<IPmTypeProps> = (props) => {
  const { id } = props;
  const { data } = usePmType();
  const target = data?.find(item => item.en_name === id);

  if (!id || !target) return null;

  return (
    <Tag round color={target.color} style={{width: '50px', textAlign: 'center', marginRight: '5px'}}>
      {transfer(target)}
    </Tag>
  )
}

export default PmType;
