import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePmDetail } from '@/api/classic';
import useTitleContext from '@/layout/title-context';
import transfer from '@/utils/i18n';
import PmType from '@/components/pm-type';
import Gender from './components/gender';
import BaseStats from './components/base-stats';
import TypeDefense from './components/type-defense';
import LightForm, { LightFormBlock, LightFormItem } from '@/components/light-form';

const PokeIndex: FC = () => {
  const { nationalNum } = useParams();
  const navigate = useNavigate();
  const { data } = usePmDetail(nationalNum);
  const { setPageTitle } = useTitleContext();
  useEffect(() => setPageTitle(data), [data]);

  if (!data) return null;

  return (
    <div>
      <div>
        <span>{transfer(data)}</span> |
        <span>{data.en_name}</span> |
        <span>No.{data.national_num.toString().padStart(3,'0')}</span>
      </div>
      <div>
        <PmType id={data.type_id1} />
        <PmType id={data.type_id2} />
      </div>
      <div>
        height: <span>{data.height}m</span> |
        widght: <span>{data.weight}kg</span>
      </div>
      <div>
        <Gender expression={data.gender} />
      </div>

      <LightForm>
        <LightFormBlock title="">
          <LightFormItem label="ability">
            <div>{data.ability_id1}</div>
            <div>{data.ability_id2}</div>
            <div>{data.ability_id3}</div>
          </LightFormItem>
          <LightFormItem label="egg group">
            <div>eggGroup</div>
          </LightFormItem>
        </LightFormBlock>
        <LightFormBlock title={"move"}>
          <div onClick={() => navigate('move')}>move</div>
        </LightFormBlock>
        <LightFormBlock title={"base stats"}>
          <BaseStats data={data.base_stats} />
        </LightFormBlock>
        <LightFormBlock title={"type defense"}>
          <TypeDefense typeIds={[data.type_id1, data.type_id2]} />
        </LightFormBlock>
        <LightFormBlock title={"evolution"}>
          <div>
            evolution
          </div>
        </LightFormBlock>
      </LightForm>
    </div>
  );
}

export default PokeIndex;
