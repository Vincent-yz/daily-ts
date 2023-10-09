import React, { FC, useEffect, useState } from 'react';
import { ITeam, useTeam } from '@/api/king/team';
import { IPlayer } from '@/api/king/player';

import Player from './player';
import { Grid } from 'antd-mobile';
import styles from './team.module.css';
import PlayerEditor from './player-editor';

type ITeamProps = {
  trainerId?: string;
  availableTeam: number[];
}

const Team: FC<ITeamProps> = (props) => {
  const { trainerId, availableTeam } = props;
  const { data } = useTeam(trainerId);
  const [filterTeam, setFilterTeam] = useState<ITeam[]>([]);
	const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<IPlayer>();

  useEffect(() => {
    setFilterTeam(data?.filter(t => availableTeam.indexOf(t.num) > -1) ?? []);
  }, [data, availableTeam]);

  if (!data) return null;
  if (availableTeam.length === data.length) return null;

  const editPlayer = (player: IPlayer) => {
    const target: IPlayer = {...player, moves: [...player.moves]};
    setDialogVisible(true);
    setSelected(target);
  }

  return (
    <div className={styles.teamWrapper}>
      {filterTeam.map(({num, players}) => (
        <div key={num}>
          <div className={styles.teamTitle}>{num}号队伍</div>
          <Grid columns={3} gap={4}>
          {players.map(p =>
            <Grid.Item key={p.id}>
              <Player data={p} onEdit={editPlayer} />
            </Grid.Item>
          )}
          </Grid>
        </div>
      ))}

      <PlayerEditor
        visible={dialogVisible}
        trainerId={trainerId}
        target={selected}
        onClose={() => setDialogVisible(false)}
      />
    </div>
  )
}

export default Team;
