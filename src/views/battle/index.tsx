import React, { useEffect } from 'react';
import useLayoutContext from '@/layout/layout-context';

const Battle = () => {
  const { setPageTitle } = useLayoutContext();
  useEffect(() => setPageTitle('battle'), [setPageTitle]);

  return (
    <div>
      Battle
    </div>
  )
}

export default Battle;
