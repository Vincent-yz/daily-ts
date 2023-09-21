import React, { FC } from 'react';
import { List } from 'antd-mobile';
import { Pokemon } from '@/api/classic';
import PmType from '../pm-type';
import styles from './index.module.css';
import { useNavigate } from 'react-router';
import transfer from '@/utils/i18n';

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
            <div className={styles.prefix}>logo</div>
            <div className={styles.content}>
              <div className={styles.chName}>{transfer(item)}</div>
              <div className={styles.enName}>{item.en_name}</div>
              <div className={styles.pmType}>
                <PmType id={item.type1} />
                <PmType id={item.type2} />
              </div>
            </div>
            <div className={styles.suffix}>No.{item.national_num.toString().padStart(3,'0')}</div>
          </div>
        </List.Item>
      ))}
    </List>
  )
}

export default PokePage;
