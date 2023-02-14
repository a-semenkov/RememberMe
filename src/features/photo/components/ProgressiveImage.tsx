import React, { useEffect, useState } from 'react';
import Loader from '../../loader/Loader';
import styles from './progressiveImage.module.css';

export interface IImage {
  src: string;
  placeholderSrc: string;
  alt: string;
}

function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  ...props
}: IImage & React.HTMLAttributes<HTMLImageElement>) {
  const [imageSrc, setImageSrc] = useState<string>(placeholderSrc);
  const [imageLoading, setImageLoading] = useState<Boolean>(true);

  const cn = `${styles.progressive} ${
    imageSrc === placeholderSrc ? styles.loading : styles.loaded
  }`;

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
    };
  }, [src]);

  const onLoad = () => {
    setImageLoading(false);
  };

  return (
    <>
      {imageLoading && <Loader />}
      <img className={cn} src={imageSrc} alt={alt} {...props} onLoad={onLoad} />
    </>
  );
}

export default ProgressiveImage;
