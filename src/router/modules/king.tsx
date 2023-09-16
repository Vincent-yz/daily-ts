import React from 'react';
import { RouteObject } from 'react-router';
import Region from '@/views/king/region';
import Trainer from '@/views/king/trainer';

const routes: RouteObject[] = [
  {
    path: "king/:regionId",
    element: <Region />
  },
  {
    path: "king/:regionId/trainer/:trainerId",
    element: <Trainer />
  },
]

export default routes;
