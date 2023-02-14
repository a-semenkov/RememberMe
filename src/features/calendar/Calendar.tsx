import React, { useState } from 'react';
import { add, format, sub } from 'date-fns';
import { ru } from 'date-fns/locale';
import { NextIcon, PrevIcon } from './components/icons';
import { createListObject } from '../../utils/generateRandomKey';
import Dates from './components/Dates';

import useLocationData from './hooks/useLocationData';
import styles from './calendar.module.css';

const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((i) =>
  createListObject(i)
);

function Calendar() {
  const locationDate = useLocationData();

  const [selectedDate, setSelectedDate] = useState(locationDate);

  const handleNextClick = (): void => {
    setSelectedDate((prev) => add(prev, { months: 1 }));
  };
  const handlePrevClick = (): void =>
    setSelectedDate((prev) => sub(prev, { months: 1 }));

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div key={selectedDate.toString()} className={styles.currentDate}>
          {format(selectedDate, 'LLLL, yyyy', { locale: ru })}
        </div>
        <div className={styles.picker}>
          <div className={styles.arrows} onClick={() => handlePrevClick()}>
            <PrevIcon className={styles.arrowsSvg} />
          </div>
          <div className={styles.arrows} onClick={() => handleNextClick()}>
            <NextIcon className={styles.arrowsSvg} />
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.weekdays}>
          {weekdays.map((i) => (
            <div key={i.id} className={styles.weekdaysItem}>
              <div>{i.value}</div>
            </div>
          ))}
        </div>
        <Dates selectedDate={selectedDate} />
      </div>
    </div>
  );
}

export default React.memo(Calendar);
