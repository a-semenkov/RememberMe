import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactComponent as Clear } from '../../assets/svg/clear.svg';
import styles from './mood.module.css';
import getMoodFromList from './utils/getMoodFromList';
import { IEntryComponent } from '../../pages/entry/types/entry.types';
import useMoodState from './hooks/useMoodState';
import Dropdown from '../../components/Dropdown/Dropdown';
import MoodsList from './MoodsList';
import AddButton from '../../pages/entry/Buttons/AddButton';

import { ReactComponent as Heart } from '../../assets/svg/heart.svg';

function Mood({ entry }: IEntryComponent) {
  const [mood, clearMood] = useMoodState();

  const dropdown = (
    <Dropdown
      cls={styles.dropdownMood}
      triggerElement={<AddButton icon={<Heart />} caption='Настроение' />}
    >
      <MoodsList />
    </Dropdown>
  );

  return (
    <AnimatePresence>
      {!mood && !entry ? (
        dropdown
      ) : (
        <motion.div
          key='moodPreviewDiv'
          initial={{ x: 10, y: '-50%', scale: '10%' }}
          animate={{ scale: '100%' }}
          exit={{ scale: '10%', transition: { duration: 0.1 } }}
          className={styles.moodWrapper}
        >
          {entry ? (
            <div className={styles.entry}>{getMoodFromList(entry)}</div>
          ) : (
            <div className={styles.preview} onClick={clearMood}>
              {getMoodFromList(mood as string)}
              <Clear className={styles.clearPreview} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Mood;
