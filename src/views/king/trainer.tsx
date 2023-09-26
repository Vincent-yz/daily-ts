import React, { FC, useState } from 'react';
import { useParams } from 'react-router';
import Filter from './components/filter';
import Team from './components/team';

const Trainer: FC = () => {
  const { regionId, trainerId } = useParams();
  const [availableTeam, setAvailableTeam] = useState<string[]>([]);

  return (
    <div>
      <div>Region: {regionId}</div>
      <div>trainer: {trainerId}</div>
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
