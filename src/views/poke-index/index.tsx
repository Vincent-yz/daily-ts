import React, { useState } from 'react';
import PokeList, { IPokeListItem } from '@/components/poke-list';
import { usePmData } from '@/api/classic';
import { Input, Dropdown, Selector } from 'antd-mobile'

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');

  return (
    <div>
      <span>
        <Input value={keyword} onChange={val => setKeyword(val)} />
      </span>
      <span>
        <Dropdown>
          <Dropdown.Item key="pm_condition" title="筛选">
            <div>
              <div>属性（最多选择两项）</div>


            </div>
            <div>
              <div>世代（最多选择一项）</div>
              <div>

              </div>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </span>
    </div>
  );
}

const PokeIndex = () => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(false);
  const [listData, setData] = useState<IPokeListItem[]>([]);
  async function loadMore() {
    setHasMore(false);
    // setPage(p => p + 1);
    console.log(123);
  }
  // const { data, isLoading } = usePmData(1);
  // if (isLoading) {
  //   return <div>loading...</div>;
  // }
  // setData(() => data?.data.data.items);

  return (
    <div>
      <PokeList data={listData} loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}

export default PokeIndex;
