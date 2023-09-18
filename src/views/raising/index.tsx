import React, { useEffect } from 'react';
import useTitleContext from '@/layout/title-context';

const Raising = () => {
  const { setPageTitle } = useTitleContext();
  useEffect(() => setPageTitle('raising'), [setPageTitle]);

  return (
    <div>Raising</div>
  );
}

export default Raising;
