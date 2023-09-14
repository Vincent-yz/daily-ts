import React, { useState } from 'react';
import PokeList from '@/components/poke-page';
import { Input, Dropdown, Selector, Toast } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons';

const PokeIndex = () => {
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<string[]>([]);
  const [generation, setGeneration] = useState<number>(0);
  const [hasMore, setHasMore] = useState(false);

  async function loadMore() {
    setHasMore(false);
    // setPage(p => p + 1);
    console.log(123);
  }

  const setTypeLimit = (val:string[]) => {
    if (val.length > 2) {
      Toast.show({content: '最多选择两项'});
      return;
    }
    setType(val);
  }

  return (
    <div>
      <div>
        <div>
          <span>
            <Input value={keyword} onChange={val => setKeyword(val)} placeholder="输入关键字" />
          </span>
        </div>
        <div>
        <Dropdown>
          <Dropdown.Item key="pm_condition" title="筛选" arrow={<FilterOutline />}>
            <div>
              <div>属性（最多选择两项）</div>
              <Selector
                columns={5}
                options={[
                  {
                    label: '111',
                    value: '111',
                  },
                  {
                    label: '222',
                    value: '222',
                  },
                  {
                    label: '333',
                    value: '333',
                  },
                  {
                    label: '444',
                    value: '444',
                  },
                  {
                    label: '555',
                    value: '555',
                  },
                  {
                    label: '666',
                    value: '666',
                  },
                  {
                    label: '777',
                    value: '777',
                  },
                ]}
                multiple={true}
                value={type}
                onChange={setTypeLimit}
              />
            </div>
            <div>
              <div>世代（最多选择一项）</div>
              <div>

              </div>
            </div>
          </Dropdown.Item>
        </Dropdown>
        </div>
      </div>
      <PokeList url="/classic/pokemon" currentPage={page} />
    </div>
  );
}

export default PokeIndex;
