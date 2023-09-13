import React, { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AntOutline, StarOutline, CalculatorOutline, UnorderedListOutline, FlagOutline } from 'antd-mobile-icons';
import styles from './index.module.css';

interface ITabBarItem {
  key: string;
  title: string;
  icon: FC;
}

const TabBarItem: ITabBarItem[] = [
  { key: "/dashboard/poke-index", title: "全国图鉴", icon: AntOutline },
  { key: "/dashboard/king", title: "天王", icon: StarOutline },
  { key: "/dashboard/raising", title: "培育", icon: FlagOutline },
  { key: "/dashboard/battle", title: "模拟", icon: CalculatorOutline },
  { key: "/dashboard/tools", title: "工具", icon: UnorderedListOutline },
];

const Classic = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.tabBar}>
        <TabBar onChange={(key) => navigate(key)}>
          {TabBarItem.map(item => (
            <TabBar.Item key={item.key} title={item.title} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Classic;
