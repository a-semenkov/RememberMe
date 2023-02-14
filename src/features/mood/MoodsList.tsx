/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setMood } from '../calendarEntry/entrySlice';
import MOOD_LIST from './components/moodList';
import styles from './moodsList.module.css';

function MoodsList() {
  const dispatch = useDispatch();
  return (
    <motion.ul
      initial={{ x: '100%', opacity: 0 }}
      animate={{
        x: 20,
        opacity: 1,
      }}
      exit={{
        x: '100%',
        opacity: 0,
        transition: {
          duration: 0.1,
        },
      }}
      role='menu'
      className={styles.list}
    >
      {MOOD_LIST.map(({ id, value: icon }) => (
        <li
          key={id}
          role='button'
          className={styles.item}
          onClick={() => dispatch(setMood(id))}
        >
          {icon}
        </li>
      ))}
    </motion.ul>
  );
}

export default MoodsList;
