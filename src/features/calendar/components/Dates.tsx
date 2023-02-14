import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  format,
  isAfter,
  isSameDay,
  isSameMonth,
  startOfToday,
} from 'date-fns';
import createDatesArray from '../utils/createDatesArray';
import styles from './dates.module.css';
import { getUserId } from '../../user/userSlice';
import { useGetPhotosQuery } from '../../api/dbSlice';
import formatDate from '../../../utils/formatDate';

interface IDateProps {
  selectedDate: Date;
}

function Dates({ selectedDate }: IDateProps) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);

  const monthDatesArray = useMemo(
    () => createDatesArray(selectedDate),
    [selectedDate]
  );

  const uid = useSelector(getUserId);
  const { data: photosArray } = useGetPhotosQuery({ uid });

  return (
    <div className={styles.dates}>
      {monthDatesArray.map(({ id, value }) => (
        <Link
          to={`/photo/${formatDate(value)}`}
          key={id}
          onClick={() => {
            setSelectedDay(value);
          }}
          className={`${styles.dateItem} ${
            photosArray && photosArray.includes(formatDate(value))
              ? styles.active_entry
              : ''
          } ${isSameMonth(value, selectedDate) ? '' : styles.outOfRangeMonth} ${
            isSameDay(value, selectedDay) ? styles.selected : ''
          } ${isAfter(value, new Date()) ? styles.futureDate : null} 
          
          ${isSameDay(value, today) ? styles.today : ''}`}
        >
          <time dateTime={format(value, 'yyyy-MM-dd')}>
            {format(value, 'd')}
          </time>
        </Link>
      ))}
    </div>
  );
}

export default Dates;
