import React from 'react';
import { RouteObject } from 'react-router';
import Ability from '@/views/tools/ability';
import EggGroup from '@/views/tools/egg-group';
import HeldItem from '@/views/tools/held-item';
import Move from '@/views/tools/move';
import Nature from '@/views/tools/nature';
import Type from '@/views/tools/type';
import DataSync from '@/views/tools/data-sync';

const routes: RouteObject[] = [
  {
    path: "tools/ability",
    element: <Ability />
  },
  {
    path: "tools/egg-group",
    element: <EggGroup />
  },
  {
    path: "tools/held-item",
    element: <HeldItem />
  },
  {
    path: "tools/move",
    element: <Move />
  },
  {
    path: "tools/nature",
    element: <Nature />
  },
  {
    path: "tools/type",
    element: <Type />
  },
  {
    path: "tools/data-sync",
    element: <DataSync />
  },
];

export default routes;
