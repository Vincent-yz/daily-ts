import React, { useState } from 'react';
import PokeList, { IPokeListItem } from '@/components/poke-list';
import { usePmData } from '@/api/classic';

const PokeIndex = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(false);
  const [listData, setData] = useState<IPokeListItem[]>([]);
  async function loadMore() {
    setHasMore(false);
    // setPage(p => p + 1);
    console.log(123);
  }
  const { data, isLoading } = usePmData(1);
  if (isLoading) {
    return <div>loading...</div>;
  }
  // setData(() => data?.data.data.items);

  return (
    <div>
      <PokeList data={listData} loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}

export default PokeIndex;
