import React, { FC } from 'react';
import { IPlayer } from '@/api/king/player';
import styles from './player.module.css';
import { EyeOutline, LinkOutline, GiftOutline, StarFill } from 'antd-mobile-icons';
import { Tag } from 'antd-mobile';

type PlayerProps = {
  data: IPlayer;
  onEdit: (player: IPlayer) => void;
}

const Player: FC<PlayerProps> = (props) => {
  const { data, onEdit } = props;
  const { name, type1, type2, ability, item, moves, remark } = data;

  /** 狗 */
  const sturdy: boolean = ability === '结实' || item === '气势披带';
  const lock: boolean = item === '讲究头带' || item === '讲究眼镜' || item === '讲究围巾';

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        {name}
        {sturdy ?
          <Tag className={styles.sturdy} color="brown">狗</Tag>
        : null}
        {lock ?
          <Tag className={styles.lock} color="blue">锁</Tag>
        : null}
        <Tag className={styles.edit} color="default" onClick={() => onEdit(data)}>补充</Tag>
      </div>
      <div className={styles.type}>
        <EyeOutline />
        {type1}
      </div>
      <div className={styles.type}>
        <EyeOutline />
        {type2}
      </div>
      <div className={styles.ability}>
        <LinkOutline />
        {ability}
      </div>
      <div className={styles.item}>
        <GiftOutline />
        {item}
      </div>
      <div className={styles.move}>
        <StarFill />{moves[0]}
      </div>
      <div className={styles.move}>
        <StarFill />{moves[1]}
      </div>
      <div className={styles.move}>
        <StarFill />{moves[2]}
      </div>
      <div className={styles.move}>
        <StarFill />{moves[3]}
      </div>
      <div className={styles.remark}>
        {remark}
      </div>
    </div>
  )
}

export default Player;
