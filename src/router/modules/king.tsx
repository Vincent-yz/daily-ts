import React from 'react';
import { RouteObject } from 'react-router';
import Area from '@/views/king/area';
import Trainer from '@/views/king/trainer';

const routes: RouteObject[] = [
  {
    path: "king",
    element: <Area />
  },
  {
    path: "king/:areaId/trainer",
    element: <Trainer />
  }
]

export default routes;
