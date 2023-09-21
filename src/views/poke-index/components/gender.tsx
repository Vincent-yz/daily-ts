import React, { FC } from 'react';

type IGenderProps = {
  value: string;
}

const RULE: Record<string, string> = {
  '-1': '无性别',
  '0': '雄性100%',
  '1': '雄性87.5% | 雌性12.5%',
  '2': '雄性75% | 雌性25%',
  '6': '雄性87.5% | 雌性12.5%',
  '7': '雄性75% | 雌性25%',
  '8': '雌性100%',
}

const Gender: FC<IGenderProps> = (props) => {
  const { value } = props;
  const statement = RULE[value];

  return <div>{statement}</div>
}

export default Gender;
