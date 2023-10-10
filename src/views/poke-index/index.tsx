import React, { FC, useEffect, useRef, useState } from 'react';
import PokePage from '@/components/poke-page';
import { Dropdown, Selector, SelectorOption, Toast, SearchBar, InfiniteScroll, Space, Button, DropdownRef } from 'antd-mobile'
import { FilterOutline } from 'antd-mobile-icons';
import { usePmList, usePmType } from '@/api/classic';
import styles from './index.module.css';
import generationSelectorOptions from './gen-options';
import i18n from '@/utils/i18n';
import useLayoutContext from '@/layout/layout-context';

const PokeIndex: FC = () => {
  // 初始化状态
  const [keyword, setKeyword] = useState<string>('');
  const [type, setType] = useState<string[]>([]);
  const [generation, setGeneration] = useState<string>('0');
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [pmTypeOptions, setTypeOption]  = useState<SelectorOption<string>[]>([]);
  const ref = useRef<DropdownRef>(null);
  const { setPageTitle } = useLayoutContext();
  const { data: pmTypeList = [] } = usePmType();
  const { data: pmList = [], size, setSize, isValidating, isLoading } = usePmList(keyword, type[0], type[1], generation);
  // 转化状态
  useEffect(() => setPageTitle('poke-index'), [setPageTitle]);
  useEffect(() => setTypeOption(
    pmTypeList.map(item => {
      return {
        label: i18n.transfer(item),
        value: item.en_name,
      }
    })
  ), [pmTypeList]);
  // 定义回调方法
  async function loadMore() {
    const lastPage = pmList[pmList.length - 1];
    if (!isValidating && !isLoading && size <= pmList.length) {
      setSize(p => (p + 1));
    }
    if (lastPage) {
      setHasMore(lastPage.items.length >= lastPage.pageSize);
    }
  }

  // todo ...
  const setMixKeyword = (val: string) => {
    setKeyword(val);
  }

  const setMixType = (val:string[]) => {
    if (val.length > 2) {
      Toast.show({content: '最多选择两项'})
    } else {
      setHasMore(true);
      setType(val);
    }
  }

  const setMixGen = (val:string[]) => {
    setHasMore(true);
    setGeneration(val[0]);
  }

  const reset = () => {
    setHasMore(true);
    setKeyword('');
    setType([]);
    setGeneration('0');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.search}>
          <SearchBar value={keyword} onChange={setMixKeyword} />
        </div>
        <Dropdown ref={ref} className={styles.filter}>
          <Dropdown.Item key="pm_condition" title={i18n.transfer('filter')} arrow={<FilterOutline />}>
            <div className={styles.dropdown}>
              <div>{i18n.transfer('Type')}（最多选择两项）</div>
              <Selector
                columns={5}
                options={pmTypeOptions}
                multiple={true}
                value={type}
                onChange={setMixType}
                style={{'--padding': '8px'}}
              />
              <div>{i18n.transfer('Gen')}（最多选择一项）</div>
              <Selector
                columns={4}
                options={generationSelectorOptions}
                value={[generation]}
                onChange={setMixGen}
                style={{'--padding': '8px'}}
              />
              <Space block justify="center">
                <Button color="default" onClick={reset}>清空</Button>
                <Button color="primary" onClick={() => ref.current?.close()}>确认</Button>
              </Space>
            </div>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className={styles.content}>
        {pmList.map((page, index) => {
          return <PokePage key={index} data={page.items} />
        })}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  );
}

export default PokeIndex;
