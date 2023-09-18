import React, { FC, useEffect } from 'react';
import { useRegion } from '@/api/king';
import transfer from '@/utils/i18n';
import { useNavigate } from 'react-router';
import useTitleContext from '@/layout/title-context';

const King: FC = () => {
  const navigate = useNavigate();
  const { data = [] } = useRegion();
  const { setPageTitle } = useTitleContext();
  useEffect(() => setPageTitle('king'), [setPageTitle]);

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
