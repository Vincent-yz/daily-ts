import { useTeam } from '@/api/king/team';
import React, { FC } from 'react';
import Player from './player';

type ITeamProps = {
  trainerId?: string;
  availableTeam: string[];
}

const Team: FC<ITeamProps> = (props) => {
  const { trainerId, availableTeam } = props;

  const { data } = useTeam(trainerId);

  if (!data) return null;
  if (availableTeam.length === data.length) return null;

  return (
    <div>
      {data.map((team) => {
        const { num, players } = team;
        return (
          <div key={team.id}>
            <div>{num}号队伍</div>
            {
              players.map(p => <Player key={p.id} {...p} />)
            }
          </div>
        )

      })}
    </div>
  )
}

export default Team;
