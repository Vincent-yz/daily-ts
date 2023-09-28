import React, { useEffect } from 'react';
import useLayoutContext from '@/layout/layout-context';

const Raising = () => {
  const { setPageTitle } = useLayoutContext();
  useEffect(() => setPageTitle('raising'), [setPageTitle]);

  return (
    <div>Raising</div>
  );
}

export default Raising;
