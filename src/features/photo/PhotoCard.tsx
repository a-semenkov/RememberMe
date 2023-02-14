import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import { IEntryComponent } from '../../pages/entry/types/entry.types';
import { getPreview, setPreview } from '../calendarEntry/entrySlice';
import ProgressiveImage from './components/ProgressiveImage';

import { ReactComponent as Clear } from '../../assets/svg/clear.svg';
import styles from './photo.module.css';

export interface IPhotoCard extends IEntryComponent {
  setValue: React.Dispatch<React.SetStateAction<File | null>>;
  preview: string | null | undefined;
}

function PhotoCard({
  entry: imageUrl,
  preview,
  setValue: setImageFile,
}: IPhotoCard) {
  const dispatch = useDispatch();

  const uploadedImagePreview = useSelector(getPreview);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length < 1) return;

    setImageFile(acceptedFiles[0]);
    const url = URL.createObjectURL(acceptedFiles[0]);
    // через global state, чтобы очищать все сразу при unload компонента
    dispatch(setPreview(url));

    // TODO: URL.revokeObjectURL(url) при загрузке;
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
    maxFiles: 1,
  });

  const onclick = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(setPreview(null));
  };

  if (!imageUrl) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.dropzone} {...getRootProps()}>
          {uploadedImagePreview && (
            <div className={styles.previewWrapper} onClick={(e) => onclick(e)}>
              <img
                className={styles.preview}
                src={uploadedImagePreview}
                alt='every day preview'
              />
              <Clear className={styles.backdropImage} />
            </div>
          )}
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Перетащите файл сюда для загрузки</p>
          ) : (
            <p>
              Нажмите для загрузки изображения, или перетащите сюда ваш файл
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ProgressiveImage
        src={imageUrl}
        placeholderSrc={preview!}
        alt='foto of the day'
        key={imageUrl}
      />
    </div>
  );
}

export default PhotoCard;
