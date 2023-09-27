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

  return (
    <div className={styles.wrapper}>
      <div className={styles.name}>
        {name}
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
