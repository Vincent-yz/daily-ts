import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePmDetail } from '@/api/classic';
import useLayoutContext from '@/layout/layout-context';
import i18n from '@/utils/i18n';
import PmType from '@/components/pm-type';
import Gender from './components/gender';
import TypeDefense from './components/type-defense';
import Block from '@/components/block';
import { Grid } from 'antd-mobile';

const PokeIndex: FC = () => {
  const { nationalNum } = useParams();
  const navigate = useNavigate();
  const { data } = usePmDetail(nationalNum);
  const { setPageTitle } = useLayoutContext();
  useEffect(() => setPageTitle(data), [data, setPageTitle]);

  if (!data) return null;

  return (
    <div>
      <Block>
        <div>
          <span>{i18n.transfer(data)}</span> |
          <span>{data.en_name}</span> |
          <span>No.{data.national_num.toString().padStart(3,'0')}</span>
        </div>
        <div>
          <PmType id={data.type1} />
          <PmType id={data.type2} />
        </div>
        <div>
          height: <span>{data.height}m</span> |
          widght: <span>{data.weight}kg</span>
        </div>
        <div>
          <Gender value={data.gender} />
        </div>
      </Block>

      <Block title="">
        <Grid columns={4}>
          <Grid.Item span={1}>ability</Grid.Item>
          <Grid.Item span={3}>{data.ability1}</Grid.Item>
          <Grid.Item span={1}></Grid.Item>
          <Grid.Item span={3}>{data.ability2}</Grid.Item>
          <Grid.Item span={1}></Grid.Item>
          <Grid.Item span={3}>{data.ability3}</Grid.Item>

          <Grid.Item span={1}>egg group</Grid.Item>
          <Grid.Item span={3}>
            <div>eggGroup</div>
          </Grid.Item>
        </Grid>
      </Block>

      <Block title={"move"}>
        <div onClick={() => navigate('move')}>move</div>
      </Block>

      <Block title={"base stats"}>
        <Grid columns={4}>
          <Grid.Item span={1}>hp</Grid.Item>
          <Grid.Item span={3}>{data.base_stats.hp}</Grid.Item>
          <Grid.Item span={1}>attack</Grid.Item>
          <Grid.Item span={3}>{data.base_stats.attack}</Grid.Item>
          <Grid.Item span={1}>defense</Grid.Item>
          <Grid.Item span={3}>{data.base_stats.defense}</Grid.Item>
          <Grid.Item span={1}>sp_attack</Grid.Item>
          <Grid.Item span={3}>{data.base_stats.sp_attack}</Grid.Item>
          <Grid.Item span={1}>sp_defense</Grid.Item>
          <Grid.Item span={3}>{data.base_stats.sp_defense}</Grid.Item>
          <Grid.Item span={1}>speed</Grid.Item>
          <Grid.Item span={3}>{data.base_stats.speed}</Grid.Item>
          <Grid.Item span={1}>total</Grid.Item>
          <Grid.Item span={3}>{data.total_stats}</Grid.Item>
        </Grid>
      </Block>

      <Block title={"type defense"}>
        <TypeDefense typeIds={[data.type1, data.type2]} />
      </Block>

      <Block title={"evolution"}>
        <div>
          evolution
        </div>
      </Block>
    </div>
  );
}

export default PokeIndex;
