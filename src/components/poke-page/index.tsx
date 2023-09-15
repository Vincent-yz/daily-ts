import React from 'react';
import { List } from 'antd-mobile';
import { usePmData } from '@/api/classic';
import PmType from '../pm-type';
import styles from './index.module.css';

interface IQueryParam {

}
interface IPokeListProps {
  url:string;
  currentPage:number;
  queryParam?:IQueryParam;
}

const PokeList = (props: IPokeListProps) => {
  const { currentPage, queryParam = {} } = props;
  const { data, error, isLoading } = usePmData({currentPage});

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (!data) return <div>no data...</div>;

  return (
    <List>
      {data.map((item, index) => (
        <List.Item key={index}>
          <div className={styles.wrapper}>
            <div className={styles.prefix}>logo</div>
            <div className={styles.content}>
              <div className={styles.chName}>{item.ch_name}</div>
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

export default PokeList;
