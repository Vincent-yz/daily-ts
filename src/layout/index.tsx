import React, { FC, useState } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router';
import { NavBar } from 'antd-mobile';
import styles from './index.module.css';
import { LayoutContext } from './layout-context';
import i18n from '@/utils/i18n';
import { AppstoreOutline } from 'antd-mobile-icons';

const Layout: FC = () => {
  // 定义标题上下文的方法，包装翻译
  const [pageTitle, internalSetPageTitle] = useState<string>('标题');
  const [locateChangedTime, internalChangeLocate] = useState<number>(0);
  const setPageTitle = (val: string) => {
    if (val) {
      internalSetPageTitle(i18n.transfer(val));
    }
  };
  const changeLocate = () => {
    internalChangeLocate(p => p + 1);
  }

  const navigate = useNavigate();
  const match = useMatch('/dashboard/*');
  const back = match ? null : '';

  const onBack = () => {
    navigate(-1);
  }

  const right = (
    match ? null : <AppstoreOutline onClick={() => navigate('/')} />
  );

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <NavBar back={back} onBack={onBack} right={right}>
          {pageTitle}
        </NavBar>
      </div>
      <div className={styles.content}>
        <LayoutContext.Provider value={{ pageTitle, setPageTitle, locateChangedTime, changeLocate }}>
          <Outlet />
        </LayoutContext.Provider>
      </div>
    </div>
  );
}

export default Layout;
