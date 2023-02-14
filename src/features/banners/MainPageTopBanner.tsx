import React from 'react';
import { Link } from 'react-router-dom';
import styles from './mainPageTopBanner.module.css';

interface IMainPageTopBanner {
  icon: React.ReactNode;
  caption: string;
  link: string;
}

function MainPageTopBanner({ icon, caption, link }: IMainPageTopBanner) {
  return (
    <div className={styles.card}>
      <Link to={link}>
        <div className={styles.svgIcon}>{icon}</div>
        <p className={styles.caption}>{caption}</p>
      </Link>
    </div>
  );
}

export default MainPageTopBanner;
