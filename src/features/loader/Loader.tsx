import React from 'react';
import { motion } from 'framer-motion';
import styles from './loader.module.css';

const bounceTransition = {
  y: {
    duration: 1,
    repeat: Infinity,
    repeatType: 'reverse',
  },
  backgroundColor: {
    duration: 2,
    repeat: Infinity,
    repeatType: 'reverse',
  },
};

const itemAnimation = {
  start: {
    y: '100%',
    backgroundColor: '#ff6699',
  },
  end: {
    y: '-100%',
    backgroundColor: '#6666ff',
  },
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.25,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

export default function Loader() {
  return (
    <div className={styles.backdrop}>
      <motion.div
        className={styles.wrapper}
        variants={loadingContainerVariants}
        initial='start'
        animate='end'
      >
        <motion.div
          className={styles.ball}
          transition={bounceTransition}
          variants={itemAnimation}
        />

        <motion.div
          className={styles.ball}
          transition={bounceTransition}
          variants={itemAnimation}
        />
        <motion.div
          className={styles.ball}
          transition={bounceTransition}
          variants={itemAnimation}
        />
      </motion.div>
    </div>
  );
}
