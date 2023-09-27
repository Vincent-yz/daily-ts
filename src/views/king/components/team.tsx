import React, { FC, useEffect, useState } from 'react';
import { ITeam, useTeam } from '@/api/king/team';
import Player from './player';
import { Grid } from 'antd-mobile';
import styles from './team.module.css';

type ITeamProps = {
  trainerId?: string;
  availableTeam: number[];
}

const Team: FC<ITeamProps> = (props) => {
  const { trainerId, availableTeam } = props;
  const { data } = useTeam(trainerId);
  const [filterTeam, setFilterTeam] = useState<ITeam[]>([]);

  useEffect(() => {
    setFilterTeam(data?.filter(t => availableTeam.indexOf(t.num) > -1) ?? []);
  }, [data, availableTeam]);

  if (!data) return null;
  if (availableTeam.length === data.length) return null;

  return (
    <div className={styles.teamWrapper}>
      {filterTeam.map((team) => {
        const { num, players } = team;
        return (
          <div key={team.num}>
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
