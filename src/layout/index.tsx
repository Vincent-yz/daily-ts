import React, { FC, useState } from 'react';
import { Outlet, useMatch, useNavigate } from 'react-router';
import { NavBar } from 'antd-mobile';
import styles from './index.module.css';
import { TitleContext } from './title-context';
import transfer from '@/utils/i18n';

const Layout: FC = () => {
  // 定义标题上下文的方法，包装翻译
  const [pageTitle, internalSetPageTitle] = useState<string>('标题');
  const setPageTitle = (val: string) => {
    if (val) {
      internalSetPageTitle(transfer(val));
    }
  };

  const navigate = useNavigate();
  const match = useMatch('/dashboard/*');
  const back = match ? null : '';

  const onBack = () => {
    navigate(-1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <NavBar back={back} onBack={onBack}>
          {pageTitle}
        </NavBar>
      </div>
      <div className={styles.content}>
        <TitleContext.Provider value={{ pageTitle, setPageTitle }}>
          <Outlet />
        </TitleContext.Provider>
      </div>
    </div>
  );
}

export default Layout;
