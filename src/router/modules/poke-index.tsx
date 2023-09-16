import React from 'react';
import { RouteObject } from 'react-router';
import Pokemon from '@/views/poke-index/pokemon';
import PmMove from '@/views/poke-index/pm-move';

const routes: RouteObject[] = [
  {
    path: "poke-index/:nationalNum",
    element: <Pokemon />
  },
  {
    path: "poke-index/:nationalNum/move",
    element: <PmMove />
  }
]

export default routes;
