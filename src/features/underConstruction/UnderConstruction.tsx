import React from 'react';
import styles from './underConstruction.module.css';
import underConstructionImg from '../../assets/under-construction.jpg';

export default function UnderConstruction() {
  return (
    <img
      className={styles.underConstruction_image}
      src={underConstructionImg}
      alt='page under construcion'
    />
  );
}
