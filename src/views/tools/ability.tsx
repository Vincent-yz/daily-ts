import { IPmAbility, useAbilityList } from '@/api/classic/pm-ability';
import i18n from '@/utils/i18n';
import { InfiniteScroll, List, SearchBar } from 'antd-mobile';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDebounce } from '@/utils/delay';
import styles from './ability.module.css';

type IAbilityPageProps = {
  data: IPmAbility[];
}

const AbilityPage: FC<IAbilityPageProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <List>
      {data.map((item, index) => (
        <List.Item key={index} onClick={() => navigate(`/tools/ability/${item.en_name}`)}>
          {i18n.transfer(item)}
        </List.Item>
      ))}
    </List>
  )
}

const Ability: FC = () => {
  const [displayKeyword, setDisplayKeyword] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data: abilityList = [], size, setSize, isValidating, isLoading } = useAbilityList(keyword);

  const loadMore = async () => {
    const lastPage = abilityList[abilityList.length - 1];
    if (!isValidating && !isLoading && size <= abilityList.length) {
      setSize(p => p + 1);
    }
    if (lastPage) {
      setHasMore(lastPage.items.length >= lastPage.pageSize);
    }
  }

  const setDebounceKeyword = useDebounce((val: string) => setKeyword(val), 1000);
  const setMixKeyword = (val: string) => {
    setDisplayKeyword(val);
    setDebounceKeyword(val);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.search}>
          <SearchBar value={displayKeyword} onChange={setMixKeyword} />
        </div>
      </div>
      <div className={styles.content}>
        {abilityList.map((page, index) =>
          <AbilityPage key={index} data={page.items} />
        )}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  )
}

export default Ability;
