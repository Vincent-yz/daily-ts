import React, { useState } from 'react';
import PokeList from '@/components/poke-page';
import { Input, Dropdown, Selector, SelectorOption, Toast, SearchBar } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons';
import { usePmType } from '@/api/classic';
import styles from './index.module.css';

const generationSelectorOptions: SelectorOption<string>[] = Array(5).fill(0).map((_, index) => {
  return {
    label: `第${index + 1}世代`,
    value: (index + 1).toString(),
  }
});

const PokeIndex = () => {
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<string[]>([]);
  const [generation, setGeneration] = useState<string>('0');
  const [hasMore, setHasMore] = useState(false);

  const { data: pmTypeList = [] } = usePmType();
  const pmTypeSelectorOptions: SelectorOption<string>[] = pmTypeList.map(item => {
    return {
      label: item.ch_name,
      value: item.en_name,
    }
  });

  async function loadMore() {
    setHasMore(false);
    // setPage(p => p + 1);
    console.log(123);
  }

  const clear = () => {
    setType([]);
    setGeneration('0');
  }

  const setTypeLimit = (val:string[]) => {
    if (val.length > 2) {
      Toast.show({content: '最多选择两项'});
      return;
    }
    setType(val);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.search}>
          <SearchBar />
        </div>
        <Dropdown className={styles.filter}>
          <Dropdown.Item key="pm_condition" title="筛选" arrow={<FilterOutline />}>
            <div>属性（最多选择两项）</div>
            <Selector
              columns={5}
              options={pmTypeSelectorOptions}
              multiple={true}
              value={type}
              onChange={setTypeLimit}
              style={{'--padding': '8px'}}
            />
            <div>世代（最多选择一项）</div>
            <Selector
              columns={4}
              options={generationSelectorOptions}
              value={[generation]}
              onChange={(val) => setGeneration(val[0])}
            />
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className={styles.content}>
        <PokeList currentPage={page} />
      </div>
    </div>
  );
}

export default PokeIndex;
