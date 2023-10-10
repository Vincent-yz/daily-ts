import React, { FC, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import styles from './index.module.css';
import i18n from '@/utils/i18n';
import useLayoutContext from '@/layout/layout-context';
import TabBarItem from './tab-bar-item';

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { locateChangedTime } = useLayoutContext();
  // 仅用于刷新翻译信息
  useEffect(() => {}, [locateChangedTime]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.tabBar}>
        <TabBar activeKey={pathname} onChange={(key) => navigate(key)}>
          {TabBarItem.map(item => (
            <TabBar.Item
              key={item.key}
              title={i18n.transfer(item.title)}
              icon={item.icon}
            />
          ))}
        </TabBar>
      </div>
    </div>
  )
}

export default Dashboard;
