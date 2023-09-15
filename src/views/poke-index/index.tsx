import React, { useRef, useState } from 'react';
import PokePage from '@/components/poke-page';
import { Dropdown, Selector, SelectorOption, Toast, SearchBar, InfiniteScroll, Space, Button, DropdownRef } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons';
import { usePmData, usePmType } from '@/api/classic';
import styles from './index.module.css';

const generationSelectorOptions: SelectorOption<string>[] = Array(5).fill(0).map((_, index) => {
  return {
    label: `第${index + 1}世代`,
    value: (index + 1).toString(),
  }
});

const PokeIndex = () => {
  // 初始化状态
  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<string[]>([]);
  const [generation, setGeneration] = useState<string>('0');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const ref = useRef<DropdownRef>(null);
  // 初始化数据
  const { data: pmTypeList = [] } = usePmType();
  const pmTypeSelectorOptions: SelectorOption<string>[] = pmTypeList.map(item => {
    return {
      label: item.ch_name,
      value: item.en_name,
    }
  });

  const pmCondition = {
    keyword: keyword,
    typeId1: type[0],
    typeId2: type[1],
    generation: generation,
  }
  const { data: pmList = [], size, setSize, isValidating, isLoading } = usePmData(pmCondition);
  // 定义回调方法
  async function loadMore() {
    if (!isValidating && !isLoading) {
      setHasMore(pmList[size - 1].length > 0);
      setSize(p => {
        console.log(p);
        return p + 1;
      });
    }
  }

  const reset = () => {
    console.log('reset');
    setKeyword('');
    setType([]);
    setGeneration('0');
    setSize(1);
    ref.current?.close();
  }

  const confirm = () => {
    console.log('confirm');
    setSize(1);
    ref.current?.close();
  }

  const setTypeLimit = (val:string[]) => {
    if (val.length > 2) {
      Toast.show({content: '最多选择两项'})
    } else {
      setSize(1);
      setType(val);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.search}>
          <SearchBar value={keyword} onChange={(val) => {setSize(1);setKeyword(val);}} />
        </div>
        <Dropdown ref={ref} className={styles.filter}>
          <Dropdown.Item key="pm_condition" title="筛选" arrow={<FilterOutline />}>
            <div className={styles.dropdown}>
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
                onChange={(val) => {setSize(1);setGeneration(val[0]);}}
                style={{'--padding': '8px'}}
              />
              <Space>
                <Button color="default" onClick={reset}>清空</Button>
                <Button color="primary" onClick={confirm}>确认</Button>
              </Space>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className={styles.content}>
        {pmList.map((item, index) => {
          return <PokePage key={index} data={item} />
        })}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
}

export default PokeIndex;
