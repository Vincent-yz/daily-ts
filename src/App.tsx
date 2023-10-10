import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from '@/router';
import { SWRConfig } from 'swr';

const config = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
}

function App() {
  return (
    <SWRConfig value={config}>
      <RouterProvider router={routes} />
    </SWRConfig>
  );
}

export default App;
