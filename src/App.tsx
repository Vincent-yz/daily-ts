import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from '@/router';
import { SWRConfig } from 'swr';

function App() {
  const config = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
  }

  return (
    <SWRConfig value={config}>
      <RouterProvider router={routes} />
    </SWRConfig>
  );
}

export default App;
