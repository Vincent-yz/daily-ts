import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { NavBar } from 'antd-mobile';
import styles from './index.module.css';

const Layout = () => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <NavBar onBack={back}>
          标题
        </NavBar>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
