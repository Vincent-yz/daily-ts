import React, { FC } from 'react';

type ITeamProps = {
  trainerId: string;
  teamIndex: number;
}

const Team: FC<ITeamProps> = (props) => {
  const { trainerId, teamIndex } = props;

  return (
    <div>
      Team
    </div>
  )
}

export default Team;
