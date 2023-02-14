import React from 'react';
import { IEntryComponent } from '../../pages/entry/types/entry.types';

import useCaptionState from './hooks/useCaptionState';
import styles from './caption.module.css';

function Caption({ entry, cls }: IEntryComponent) {
  const [caption, setCaption] = useCaptionState();

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setCaption(e.target.value);
  };

  return (
    <textarea
      maxLength={60}
      placeholder='Чем вам запомнился этот день? Макс длина - 60 символов'
      readOnly={!!entry}
      className={`${styles.textarea} ${cls}`}
      value={entry || caption || ''}
      onChange={onChange}
    />
  );
}

export default Caption;
