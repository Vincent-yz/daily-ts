import React, { FC, useState } from 'react';
import { usePmAbility } from '@/api/classic/pm-ability';
import i18n from '@/utils/i18n';
import { useParams } from 'react-router';
import { useAbilityPmList } from '@/api/classic/pm';
import PokePage from '@/components/poke-page';
import { InfiniteScroll } from 'antd-mobile';

const AbilityDetail: FC = () => {
  const { key } = useParams();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { data: ability } = usePmAbility(key);
  const { data: pmList = [], size, setSize, isValidating, isLoading } = useAbilityPmList(key);

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

  if (!ability || !pmList) return null;

  const desc: string[] = ability.effect.split('\n\n');

  return (
    <div>
      <div style={{padding: '4px 8px'}}>{i18n.transfer(ability)}</div>
      {i18n.isCh() ?
        <div style={{padding: '4px 8px'}}>{ability.flavor}</div> :
      null}
      {desc.map((d, index) =>
        <div key={index} style={{padding: '4px 8px'}}>{d}</div>
      )}

      <div>
        {pmList.map((page, index) =>
          <PokePage key={index} data={page.items} />
        )}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </div>
    </div>
  )
}

export default AbilityDetail;
