import React from 'react';
import { RouteObject } from 'react-router';
import Team from '@/views/raising/team';
import Pm from '@/views/raising/pm';

const routes: RouteObject[] = [
  {
    path: "raising/:teamId",
    element: <Team />
  },
  {
    path: "raising/:teamId/pm/:pmId",
    element: <Pm />
  },
];

export default routes;
