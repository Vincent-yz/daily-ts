import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTrainer } from '@/api/king';
import transfer from '@/utils/i18n';

const Region: FC = () => {
  const navigate = useNavigate();
  const { regionId } = useParams();
  const { data = [] } = useTrainer(regionId);

  return (
    <div>
      <div>Region: {regionId}</div>
      {data.map(trainer =>
        <div
          key={trainer.id}
          onClick={() => navigate(`/king/${regionId}/trainer/${trainer.id}`)}>
          {transfer(trainer)}
        </div>
      )}
    </div>
  )
}

export default Region;
