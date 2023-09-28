import React, { FC } from 'react';
import { Tag } from 'antd-mobile';
import { usePmType } from '@/api/classic';
import i18n from '@/utils/i18n';

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
      {i18n.transfer(target)}
    </Tag>
  )
}

export default PmType;
