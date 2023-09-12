import React from 'react';
import { RouteObject } from 'react-router';
import Team from '@/views/raising/team';

const routes: RouteObject[] = [
  {
    path: "raising/team/:id",
    element: <Team />
  },
];

export default routes;
