import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTrainer } from '@/api/king';
import i18n from '@/utils/i18n';
import { List } from 'antd-mobile';
import KingDropdown from './components/king-dropdown';

const Region: FC = () => {
  const navigate = useNavigate();
  const { regionId } = useParams();
  const { data: trainer = [] } = useTrainer(regionId);

  return (
    <>
      <KingDropdown activeRegion={regionId} />
      <List>
        {trainer.map(t =>
          <List.Item key={t.id}>
            <div onClick={() => navigate(`/king/${regionId}/trainer/${t.id}`)}>
              {i18n.transfer(t)}
            </div>
          </List.Item>
        )}
      </List>
    </>
  )
}

export default Region;
