import React, { FC, useEffect } from 'react';
import { useRegion } from '@/api/king';
import i18n from '@/utils/i18n';
import { useNavigate } from 'react-router';
import useLayoutContext from '@/layout/layout-context';
import { List } from 'antd-mobile';

const King: FC = () => {
  const navigate = useNavigate();
  const { data = [] } = useRegion();
  const { setPageTitle } = useLayoutContext();
  useEffect(() => setPageTitle('king'), [setPageTitle]);

  return (
    <div>
      <List>
        {data.map(region =>
          <List.Item key={region.en_name} arrow>
            <div onClick={() => navigate(`/king/${region.en_name}`)}>
            {i18n.transfer(region)}
            </div>
          </List.Item>
        )}
      </List>
    </div>
  );
}

export default King;
