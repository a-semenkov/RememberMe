import React from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as Save } from '../../../assets/svg/save.svg';
import styles from './saveButton.module.css';

interface ISaveButton {
  onClick: () => void;
}

function SaveButton({ onClick }: ISaveButton) {
  return (
    <motion.button
      className={styles.buttonWrapper}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '150%' }}
      onClick={onClick}
    >
      <p>Сохранить?</p>
      <Save className={styles.svg} />
    </motion.button>
  );
}

export default SaveButton;
