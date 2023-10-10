import { FC } from 'react';
import { AntOutline, StarOutline, CalculatorOutline, UnorderedListOutline, FlagOutline } from 'antd-mobile-icons';

type ITabBarItem = {
  key: string;
  title: string;
  icon: FC;
}

const TabBarItem: ITabBarItem[] = [
  { key: "/dashboard/poke-index", title: "poke-index", icon: AntOutline },
  { key: "/dashboard/king", title: "king", icon: StarOutline },
  { key: "/dashboard/raising", title: "raising", icon: FlagOutline },
  { key: "/dashboard/battle", title: "battle", icon: CalculatorOutline },
  { key: "/dashboard/tools", title: "tools", icon: UnorderedListOutline },
];

export default TabBarItem;
