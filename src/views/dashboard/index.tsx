import React, { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AntOutline, StarOutline, CalculatorOutline, UnorderedListOutline, FlagOutline } from 'antd-mobile-icons';
import styles from './index.module.css';
import i18n from '@/utils/i18n';
import useLayoutContext from '@/layout/layout-context';

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

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { locateChangedTime } = useLayoutContext();
  useEffect(() => {}, [locateChangedTime]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.tabBar}>
        <TabBar activeKey={pathname} onChange={(key) => navigate(key)}>
          {TabBarItem.map(item => (
            <TabBar.Item key={item.key} title={i18n.transfer(item.title)} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Dashboard;
