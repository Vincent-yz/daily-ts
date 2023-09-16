import React from 'react';
import { RouteObject } from 'react-router';
import Type from '@/views/tools/type';
import Nature from '@/views/tools/nature';
import Move from '@/views/tools/move';
import Ability from '@/views/tools/ability';
import EggGroup from '@/views/tools/egg-group';
import HeldItem from '@/views/tools/held-item';
import DataSync from '@/views/tools/data-sync';

import MoveDetail from '@/views/tools/move-detail';
import AbilityDetail from '@/views/tools/ability-detail';
import EggGroupDetail from '@/views/tools/egg-group-detail';

const routes: RouteObject[] = [
  {
    path: "tools/type",
    element: <Type />
  },
  {
    path: "tools/nature",
    element: <Nature />
  },
  {
    path: "tools/move",
    element: <Move />
  },
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
    path: "tools/data-sync",
    element: <DataSync />
  },
  // 详情页，查看关联数据
  {
    path: "tools/move/:id",
    element: <MoveDetail />
  },
  {
    path: "tools/ability/:id",
    element: <AbilityDetail />
  },
  {
    path: "tools/egg-group/:id",
    element: <EggGroupDetail />
  },
];

export default routes;
