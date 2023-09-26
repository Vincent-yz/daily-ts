import React, { FC } from 'react';
import { useTeam } from '@/api/king/team';
import Player from './player';
import { Grid } from 'antd-mobile';
import styles from './team.module.css';

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
    <div className={styles.teamWrapper}>
      {data.map((team) => {
        const { num, players } = team;
        return (
          <div key={team.id}>
            <div className={styles.teamTitle}>{num}号队伍</div>
            <Grid columns={3} gap={4}>
            {players.map(p =>
              <Grid.Item key={p.id}>
                <Player {...p} />
              </Grid.Item>
            )}
            </Grid>
          </div>
        )

      })}
    </div>
  )
}

export default Team;
