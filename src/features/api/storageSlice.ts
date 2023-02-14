import { nanoid } from '@reduxjs/toolkit';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebase';

import { handleApiError } from '../errors/apiErrorHandling';
import { apiSlice } from './apiSlice';

interface IUploadImage {
  uid: string;
  image: File;
  minifiedImage: File;
  date: string;
}

interface IImageUrl {
  imageUrl: string;
  minifiedImageUrl: string;
}

// interface IGetImageUrl {
//   url: string[] | null;
// }

// interface IGetImage extends Pick<IUploadImage, 'uid' | 'date'> {}

export const storageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<IImageUrl, IUploadImage>({
      queryFn: async ({ uid, image, minifiedImage, date }) => {
        try {
          const imageRef = ref(
            storage,
            `/images/${uid}/${date}/${nanoid() + image.name}`
          );
          const imagePreviewRef = ref(
            storage,
            `/images/${uid}/${date}/preview-${nanoid() + minifiedImage.name}`
          );

          const snapshot = await uploadBytes(imageRef, image);
          const previewSnapshot = await uploadBytes(
            imagePreviewRef,
            minifiedImage
          );

          const imageUrl = await getDownloadURL(snapshot.ref);
          const minifiedImageUrl = await getDownloadURL(previewSnapshot.ref);

          return { data: { imageUrl, minifiedImageUrl } };
        } catch (e) {
          return handleApiError(e);
        }
      },
    }),

    // получить изображение за определенную дату через storage
    // getImage: builder.query<IGetImageUrl, IGetImage>({
    //   queryFn: async ({ uid, date }) => {
    //     try {
    //       const imgRef = ref(storage, `/images/${uid}/${date}`);
    //       const list = await listAll(imgRef);
    //       if (list.items.length < 1) return { data: { url: null } };

    //       const url = await getDownloadURL(list.items);
    //       console.log(url);
    //       return { data: { url } };
    //     } catch (e) {
    //       return handleApiError(e);
    //     }
    //   },
    // }),
  }),
});

export const { useUploadImageMutation } = storageSlice;
