import React, { FC } from 'react';

type IGenderProps = {
  expression: string;
}

const Gender: FC<IGenderProps> = (props) => {
  const { expression } = props;
  const parts = expression.split(':');
  const male = parseInt(parts[0]);
  const female = parseInt(parts[1]);

  let statement;

  if (male === 0 || female === 0) {
    if (male !== 0) {
      statement = '雄性100%';
    } else if (female !== 0) {
      statement = '雌性100%';
    } else {
      statement = '无性别';
    }
  } else {
    const total = (male + female) / 100;
    statement = `雄性${male / total}% | 雄性${female / total}%`;
  }

  return <div>{statement}</div>
}

export default Gender;
