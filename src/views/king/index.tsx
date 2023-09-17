import React, { FC } from 'react';
import { useRegion } from '@/api/king';
import transfer from '@/utils/i18n';
import { useNavigate } from 'react-router';

const King: FC = () => {
  const navigate = useNavigate();
  const { data = [] } = useRegion();

  return (
    <div>
      <div>King</div>
      {data.map(region =>
        <div
          key={region.en_name}
          onClick={() => navigate(`/king/${region.en_name}`)}>
          {transfer(region)}
        </div>
      )}
    </div>
  );
}

export default King;
