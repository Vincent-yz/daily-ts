import React from 'react';
import { RouteObject, Navigate } from 'react-router';
import Dashboard from '@/views/dashboard';
import PokeIndex from '@/views/poke-index';
import King from '@/views/king';
import Raising from '@/views/raising';
import Battle from '@/views/battle';
import Tools from '@/views/tools';

const routes: RouteObject[] = [
  {
    index: true,
    element: <Navigate to="/dashboard/poke-index" replace />
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "poke-index",
        element: <PokeIndex />,
        index: true,
      },
      {
        path: "king",
        element: <King />
      },
      {
        path: "raising",
        element: <Raising />
      },
      {
        path: "battle",
        element: <Battle />
      },
      {
        path: "tools",
        element: <Tools />
      },
    ],
  }
]

export default routes;
