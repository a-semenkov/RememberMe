import { SerializedError } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetPhotoQuery, useGetPhotosQuery } from '../../api/dbSlice';
import { getUserId } from '../../user/userSlice';

export default function useGetImage() {
  const { date } = useParams<string>();
  const uid = useSelector(getUserId);

  if (!date)
    return {
      error: {
        message: 'Произошла ошибка, попробуйте перезагрузить страницу',
      } as SerializedError,
    };

  const { data: photoArr, error: getPhotoArrError } = useGetPhotosQuery({
    uid,
  });

  if (getPhotoArrError) return { error: getPhotoArrError };

  const { data, isFetching, error, isSuccess } = useGetPhotoQuery(
    { uid, date },
    {
      skip: !photoArr?.includes(date),
    }
  );

  return { data, isFetching, error, isSuccess };
}
