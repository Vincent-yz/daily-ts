import React, { FC } from 'react';
import { useParams } from 'react-router';
import Team from '../raising/team';
import Filter from './components/filter';

const Trainer: FC = () => {
  const { regionId, trainerId } = useParams();

  return (
    <div>
      <div>Region: {regionId}</div>
      <div>trainer: {trainerId}</div>
      <Filter trainerId={trainerId} />
      <Team />
    </div>
  )
}

export default Trainer;
