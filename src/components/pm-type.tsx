import React, { FC } from 'react';
import { Tag } from 'antd-mobile';
import { usePmType } from '@/api/classic';

interface IPmTypeProps {
  id: string;
}

const PmType:FC<IPmTypeProps> = (props) => {
  const { id } = props;
  const { data } = usePmType();
  const target = data?.find(item => item.en_name === id);

  if (!id || !target) return null;

  return (
    <Tag round color={target.color} style={{width: '50px', textAlign: 'center', marginRight: '5px'}}>
      {target.en_name}
    </Tag>
  )
}

export default PmType;
