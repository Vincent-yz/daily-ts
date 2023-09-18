import React, { FC, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePmDetail } from '@/api/classic';
import useTitleContext from '@/layout/title-context';
import transfer from '@/utils/i18n';

const PokeIndex: FC = () => {
  const { nationalNum } = useParams();
  const navigate = useNavigate();
  const { data } = usePmDetail(nationalNum);
  const { setPageTitle } = useTitleContext();
  useEffect(() => setPageTitle(data), [data]);

  if (!data) return null;

  return (
    <div>
      <div>PokeIndex</div>
      <div>{transfer(data)}</div>
      <div>{nationalNum}</div>
      <div onClick={() => navigate('move')}>move</div>
    </div>
  );
}

export default PokeIndex;
