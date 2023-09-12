import React from 'react';
import { RouteObject } from 'react-router';
import Pokemon from '@/views/poke-index/pokemon';

const routes: RouteObject[] = [
  {
    path: "poke-index/:id",
    element: <Pokemon />
  }
]

export default routes;
