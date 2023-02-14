import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import checkURL from './hooks/useCheckUrl';

import PhotoCard from '../../features/photo/PhotoCard';

import Caption from '../../features/caption/Caption';

import {
  getEntryState,
  isEmptyEntryState,
  isEntryFilled,
} from '../../features/calendarEntry/entrySlice';

import { useCreateNewEntryMutation } from '../../features/api/dbSlice';
import useGetImage from '../../features/photo/hooks/useGetImage';
import { getUserId } from '../../features/user/userSlice';
import useClearEntryStore from './hooks/useClearEntryStore';

import { useUploadImageMutation } from '../../features/api/storageSlice';
import NotFound from '../../features/notFound/NotFound';

import Loader from '../../features/loader/Loader';
import Mood from '../../features/mood/Mood';
import { createPreview, resizeImage } from '../../utils/resizeImage';

import styles from './entry.module.css';
import SaveButton from './Buttons/SaveButton';

// Корневой компонент получает данные с сервера
// Здесь должен храниться файл, чтобы не получилось ситуации, когда пользователь загрузил файл на диск, но потом ушел со страницы

function Entry() {
  const date = checkURL();

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const { data: entry, isFetching } = useGetImage();

  const uid = useSelector(getUserId);
  const { caption, mood } = useSelector(getEntryState);
  const stateEmpty = useSelector(isEmptyEntryState);
  const isEntryFilledIn = useSelector(isEntryFilled);

  const [createNewDbEntry] = useCreateNewEntryMutation();

  const [uploadImage] = useUploadImageMutation();

  useClearEntryStore({ setValue: setImageUpload });

  if (!date) return <NotFound />;
  if (isFetching) return <Loader />;

  const onSave = async () => {
    if (!isEntryFilledIn || !imageUpload) return;

    // Подпись и настроение можно поставить только на этапе создания записи. Изменить их нельзя

    try {
      setLoading(true);
      let imageForUpload = imageUpload;
      const minifiedImage = await createPreview(imageUpload);
      console.log(minifiedImage);
      if (imageUpload.size > 1500000)
        imageForUpload = await resizeImage(imageUpload);

      const { imageUrl, minifiedImageUrl } = await uploadImage({
        uid,
        image: imageForUpload,
        minifiedImage,
        date,
      }).unwrap();

      await createNewDbEntry({
        uid,
        date,
        imageUrl,
        minifiedImageUrl,
        caption,
        mood,
      }).unwrap();

      setLoading(false);
    } catch (e: unknown) {
      setLoading(false);
      console.log(e);
      // Этот блок относится только к resizeImage, обработка ошибки обращения к БД находится в редаксе
      toast.error('Ошибка обработки изображения');
    }
  };

  return (
    <div className={styles.entry}>
      {loading && <Loader />}

      <div className={styles.date}>{date}</div>

      <PhotoCard
        entry={entry?.imageUrl}
        preview={entry?.minifiedImageUrl}
        setValue={setImageUpload}
      />
      {entry || (!entry && !stateEmpty) ? (
        <>
          <Mood entry={entry?.mood} />
          <Caption cls={styles.caption} entry={entry?.caption} />
        </>
      ) : null}

      {createPortal(
        <AnimatePresence>
          {!entry && isEntryFilledIn && <SaveButton onClick={onSave} />}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

export default Entry;
