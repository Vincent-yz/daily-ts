import React, { FC } from 'react';
import { List } from 'antd-mobile';
import { Pokemon } from '@/api/classic';
import PmType from '../pm-type';
import styles from './index.module.css';
import { useNavigate } from 'react-router';
import i18n from '@/utils/i18n';
import Avatar from './avatar';

const formatNum = (n: number) => n.toString().padStart(3,'0');

// M=超进化, MX=megaX, MY=megaY, GM=极巨化, F=雌性形态, A=阿罗拉, G=嘉乐儿, H=洗翠

type IPokePageProps = {
  data: Pokemon[];
}

const PokePage:FC<IPokePageProps> = (props) => {
  const { data } = props;
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <List>
      {data.map((item, index) => (
        <List.Item key={index} onClick={() => navigate(`/poke-index/${item.national_num}`)} arrow={false}>
          <div className={styles.wrapper}>
            <div className={styles.prefix}>
              <Avatar value={item.national_num}></Avatar>
            </div>
            <div className={styles.content}>
              <div className={styles.chName}>{i18n.transfer(item)}</div>
              <div className={styles.enName}>{item.en_name}</div>
              <div className={styles.pmType}>
                <PmType id={item.type1} />
                <PmType id={item.type2} />
              </div>
            </div>
            <div className={styles.suffix}>No.{formatNum(item.national_num)}</div>
          </div>
        </List.Item>
      ))}
    </List>
  )
}

export default PokePage;
