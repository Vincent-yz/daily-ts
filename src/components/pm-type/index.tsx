import React from 'react';
import { Tag } from 'antd-mobile';
import { usePmType } from '@/api/classic';

interface IPmTypeProps {
  id: string;
}

const PmType = (props: IPmTypeProps) => {
  const { id } = props;
  const { data, isLoading, error } = usePmType();

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  const target = data?.find(item => item.en_name === id);

  if (!id || !target) return null;

  return (
    <Tag round color={target.color} style={{width: '50px', textAlign: 'center'}}>
      {target.ch_name}
    </Tag>
  )
}

export default PmType;
