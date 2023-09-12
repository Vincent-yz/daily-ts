import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, InfiniteScroll } from 'antd-mobile';

const PokeIndex = () => {
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  async function loadMore() {
    const append = ['aaa'];
    setData(val => [...val, ...append]);
    setHasMore(append.length > 0);
  }

  return (
    <div>
      <List>
        {data.map((item, index) => (
          <List.Item key={index}>
            <Link to="/poke-index/111">
              <div>image</div>
              <div>name</div>
              <div>type1</div>
              <div>type2</div>
              <div>index</div>
            </Link>
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}

export default PokeIndex;
