import React, { useEffect } from 'react';
import useTitleContext from '@/layout/title-context';

const Battle = () => {
  const { setPageTitle } = useTitleContext();
  useEffect(() => setPageTitle('battle'), [setPageTitle]);

  return (
    <div>
      Battle
    </div>
  )
}

export default Battle;
