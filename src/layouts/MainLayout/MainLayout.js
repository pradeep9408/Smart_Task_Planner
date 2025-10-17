import React from 'react';
import TopNav from '../../components/Navigation/TopNav/TopNav';
import styles from './MainLayout.module.css';
import { Outlet } from 'react-router-dom';

const MainLayout = ({ productivityScore }) => {
  return (
    <div className={styles.mainLayout}>
      <TopNav productivityScore={productivityScore} />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;