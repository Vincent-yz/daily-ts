import React, { FC } from 'react';
import { List } from 'antd-mobile';
import { Pokemon } from '@/api/classic';
import PmType from '../pm-type';
import styles from './index.module.css';

interface IPokePageProps {
  data: Pokemon[];
}

const PokePage:FC<IPokePageProps> = (props) => {
  const { data } = props;

  if (!data) return null;

  return (
    <List>
      {data.map((item, index) => (
        <List.Item key={index}>
          <div className={styles.wrapper}>
            <div className={styles.prefix}>logo</div>
            <div className={styles.content}>
              <div className={styles.chName}>{item.en_name}</div>
              <div className={styles.enName}>{item.en_name}</div>
              <div className={styles.pmType}>
                <PmType id={item.type_id1} />
                <PmType id={item.type_id2} />
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
