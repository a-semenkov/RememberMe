import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  clear,
  isEmptyEntryState,
} from '../../../features/calendarEntry/entrySlice';

import { IPhotoCard } from '../../../features/photo/PhotoCard';

const useClearEntryStore = ({ setValue }: Pick<IPhotoCard, 'setValue'>) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isStoreEmpty = useSelector(isEmptyEntryState);

  useEffect(() => {
    if (isStoreEmpty) return;

    dispatch(clear());
    setValue(null);
  }, [location]);
};

export default useClearEntryStore;
