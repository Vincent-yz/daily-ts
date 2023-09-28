import React, { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AntOutline, StarOutline, CalculatorOutline, UnorderedListOutline, FlagOutline } from 'antd-mobile-icons';
import styles from './index.module.css';
import i18n from '@/utils/i18n';

type ITabBarItem = {
  key: string;
  title: string;
  icon: FC;
}

const TabBarItem: ITabBarItem[] = [
  { key: "/dashboard/poke-index", title: i18n.transfer("poke-index"), icon: AntOutline },
  { key: "/dashboard/king", title: i18n.transfer("king"), icon: StarOutline },
  { key: "/dashboard/raising", title: i18n.transfer("raising"), icon: FlagOutline },
  { key: "/dashboard/battle", title: i18n.transfer("battle"), icon: CalculatorOutline },
  { key: "/dashboard/tools", title: i18n.transfer("tools"), icon: UnorderedListOutline },
];

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.tabBar}>
        <TabBar activeKey={pathname} onChange={(key) => navigate(key)}>
          {TabBarItem.map(item => (
            <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Dashboard;
