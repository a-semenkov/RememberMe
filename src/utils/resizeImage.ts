import Resizer from 'react-image-file-resizer';

export function createPreview(image: File) {
  const result = new Promise<Awaited<File>>((resolve) => {
    Resizer.imageFileResizer(
      image,
      300,
      300,
      'JPEG',
      30,
      0,
      (uri) => {
        resolve(uri as File);
      },
      'file'
    );
  });

  return result;
}

export function resizeImage(image: File) {
  const result = new Promise<Awaited<File>>((resolve) => {
    Resizer.imageFileResizer(
      image,
      1920,
      1080,
      'JPEG',
      90,
      0,
      (uri) => {
        resolve(uri as File);
      },
      'file'
    );
  });

  return result;
}