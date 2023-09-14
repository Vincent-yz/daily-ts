import React from 'react';
import { List } from 'antd-mobile';
import { usePmData } from '@/api/classic';
import useSWR from 'swr';
import PmType from '../pm-type';

interface IQueryParam {

}
interface IPokeListProps {
  url:string;
  currentPage:number;
  queryParam?:IQueryParam;
}

const PokeList = (props: IPokeListProps) => {
  const { currentPage, url, queryParam = {} } = props;
  const { data, error, isLoading }  = useSWR([url, currentPage, queryParam], usePmData);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data) return <div>no data...</div>;

  return (
    <List>
      {data.items.map((item, index) => (
        <List.Item key={index} className="item-pm">
          <div className="logo">logo</div>
          <div>{item.en_name}</div>
          <div>{item.en_name}</div>
          <div>
            <PmType typeId={item.type_id1} />
            <PmType typeId={item.type_id2} />
          </div>
          <div>No.{item.national_num}</div>
        </List.Item>
      ))}
    </List>
  )
}

export default PokeList;
