import React from 'react';
import { InfiniteScroll, List } from 'antd-mobile';

export interface IPokeListItem {
  nationalNum: number;
  name: string;
  typeId1: string;
  typeId2: string;
  image: string;
}

interface IPokeListProps {
  data: IPokeListItem[];
  loadMore: (isRetry: boolean) => Promise<void>;
  hasMore: boolean;
}

const PokeList = (props: IPokeListProps) => {
  const { data, loadMore, hasMore } = props;
  return (
    <>
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>
            <div>{item.image}</div>
            <div>name</div>
            <div>type1</div>
            <div>type2</div>
            <div>index</div>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </>
  )
}

export default PokeList;
