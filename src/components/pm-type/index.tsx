import React from 'react';
import useSWR from 'swr';
import { Tag } from 'antd-mobile';
import request from '@/utils/request';

interface IPmTypeProps {
  typeId: string;
}

interface IPmType {
  en_name: string;
  ch_name: string;
  color: string;
}

const PmType = (props: IPmTypeProps) => {
  const { typeId } = props;
  const { data, isLoading, error } = useSWR<IPmType[]>(() => typeId ? '/classic/type' : null, request);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data) return null;

  const target: (IPmType | undefined) = data.find(item => item.en_name === typeId);

  if (!target) return <div>no match...</div>

  return (
    <Tag round color={target.color} style={{width: '50px', textAlign: 'center'}}>
      {target.ch_name}
    </Tag>
  )
}

export default PmType;
