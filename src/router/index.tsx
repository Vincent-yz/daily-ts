import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Demo from '@/views/demo';
import classicRoutes from './modules/classic';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Demo />,
  },
  ...classicRoutes,
]);

export default router;
