import React, { FC } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePmDetail } from '@/api/classic';

const PokeIndex: FC = () => {
  const { nationalNum } = useParams();
  const navigate = useNavigate();
  const { data } = usePmDetail(nationalNum);

  if (!data) return null;

  return (
    <div>
      <div>PokeIndex</div>
      <div>{nationalNum}</div>
      <div onClick={() => navigate('move')}>move</div>
    </div>
  );
}

export default PokeIndex;
