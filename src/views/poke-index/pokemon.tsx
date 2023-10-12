import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePmDetail } from '@/api/classic';
import useLayoutContext from '@/layout/layout-context';
import i18n from '@/utils/i18n';
import PmType from '@/components/pm-type';
import PmAbility from '@/components/pm-ability';
import Gender from './components/gender';
import TypeDefense from './components/type-defense';
import Block from '@/components/block';
import { Grid } from 'antd-mobile';

type IStatBarProps = {
  title: string;
  value: number;
}

const StatBar: FC<IStatBarProps> = (props) => {
  const { title, value } = props;
  return (
    <Grid columns={400}>
      <Grid.Item span={100}>{title}</Grid.Item>
      <Grid.Item span={30}>{value}</Grid.Item>
      <Grid.Item span={value} style={{margin: '1px 0', background: '#aaa'}}></Grid.Item>
      <Grid.Item span={255-value} style={{margin: '1px 0', background: '#eee'}}></Grid.Item>
    </Grid>
  )
}

const Pokemon: FC = () => {
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
          <span>{data.ch_name}</span> |
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
          <Grid.Item span={1}>{i18n.transfer('ability')}</Grid.Item>
          <Grid.Item span={3}>
            <PmAbility enName={data.ability1} />
          </Grid.Item>
          <Grid.Item span={1}></Grid.Item>
          <Grid.Item span={3}>
            <PmAbility enName={data.ability2} />
          </Grid.Item>
          <Grid.Item span={1}></Grid.Item>
          <Grid.Item span={3}>
            <PmAbility enName={data.ability3} hidden />
          </Grid.Item>

          <Grid.Item span={1}>{i18n.transfer('egg group')}</Grid.Item>
          <Grid.Item span={3}>
            <div>eggGroup</div>
          </Grid.Item>
        </Grid>
      </Block>

      <Block title={i18n.transfer("move")}>
        <div onClick={() => navigate('move')}>{i18n.transfer('move')}</div>
      </Block>

      <Block title={i18n.transfer("base stats")}>
        <StatBar title="hp" value={data.base_stats.hp}></StatBar>
        <StatBar title="attack" value={data.base_stats.attack}></StatBar>
        <StatBar title="defense" value={data.base_stats.defense}></StatBar>
        <StatBar title="sp_attack" value={data.base_stats.sp_attack}></StatBar>
        <StatBar title="sp_defense" value={data.base_stats.sp_defense}></StatBar>
        <StatBar title="speed" value={data.base_stats.speed}></StatBar>
        <Grid columns={4}>
          <Grid.Item span={1}>total</Grid.Item>
          <Grid.Item span={3}>{data.total_stats}</Grid.Item>
        </Grid>
      </Block>

      <Block title={i18n.transfer("type defense")}>
        <TypeDefense typeIds={[data.type1, data.type2]} />
      </Block>

      <Block title={i18n.transfer("evolution")}>
        <div>
          evolution
        </div>
      </Block>
    </div>
  );
}

export default Pokemon;
