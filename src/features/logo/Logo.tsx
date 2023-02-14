import React from 'react';
import logo from './logo.svg';
import styles from './logo.module.css';

function Logo() {
  return (
    <svg className={styles.logo}>
      <use href={`${logo}#logo`} />
    </svg>
  );
}

export default Logo;
