import React, { FC } from 'react';
import { IPlayer } from '@/api/king/team';

const Player: FC<IPlayer> = (props) => {
  const { id, name, type1, type2, ability, item, moves, remark } = props;

  return (
    <div>
      <div>{name}</div>
      <div>{type1}</div>
      <div>{type2}</div>
      <div>{ability}</div>
      <div>{item}</div>
      <div>{moves[0]}</div>
      <div>{moves[1]}</div>
      <div>{moves[2]}</div>
      <div>{moves[3]}</div>
      <div>{remark}</div>
    </div>
  )
}

export default Player;
