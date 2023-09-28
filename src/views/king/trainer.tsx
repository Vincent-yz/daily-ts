import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import Filter from './components/filter';
import KingDropdown from './components/king-dropdown';
import Team from './components/team';

const Trainer: FC = () => {
  const { regionId, trainerId } = useParams();
  const [availableTeam, setAvailableTeam] = useState<number[]>([]);

  return (
    <div style={{paddingBottom: 12}}>
      <KingDropdown
        activeRegion={regionId}
        activeTrainer={trainerId} />
      <Filter
        trainerId={trainerId}
        onAvailableTeamChange={(teams) => setAvailableTeam(teams)}
      />
      <Team
        trainerId={trainerId}
        availableTeam={availableTeam}
      />
    </div>
  )
}

export default Trainer;
