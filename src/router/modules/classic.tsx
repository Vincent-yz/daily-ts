import React from 'react';
import { RouteObject } from 'react-router';
import PokeIndex from '@/views/poke-index';

const routes: RouteObject[] = [
  {
    "path": "poke-index",
    "element": <PokeIndex />
  }
]

export default routes;
