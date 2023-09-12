import * as React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Demo from '@/views/demo';
import Layout from '@/layout';
import dashboardRoutes from './modules/dashboard';
import pokeIndexRoutes from './modules/poke-index';
import kingRoutes from './modules/king';
import raisingRoutes from './modules/raising';
import toolsRoutes from './modules/tools';

const router = createBrowserRouter([
  {
    path: '/demo',
    element: <Demo />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      ...dashboardRoutes,
      ...pokeIndexRoutes,
      ...kingRoutes,
      ...raisingRoutes,
      ...toolsRoutes,
    ]
  },
]);

export default router;
