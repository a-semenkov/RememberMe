import React from 'react';
import styles from './notFound.module.css';
import notFoundImg from '../../assets/404.jpg';

export default function NotFound() {
  return (
    <img
      className={styles.notFound_image}
      src={notFoundImg}
      alt='page not found'
    />
  );
}
