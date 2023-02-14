import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { db } from '../../firebase/firebase';
import { handleApiError } from '../errors/apiErrorHandling';
import { apiSlice } from './apiSlice';

interface IIsUser {
  isUser: boolean;
}

export interface ICreateNewUser {
  uid: string;
  email: string | null;
  avatar?: string | null;
}

interface ICreateNewUserResult {
  created: boolean;
}
interface IDbEntry {
  date: string;
  imageUrl: string;
  minifiedImageUrl: string;
  mood: string | null;
  caption: string | null;
}

type UpdateEntry = Pick<IDbEntry, 'mood' | 'caption'> &
  Pick<IDbEntry, 'date'> &
  Pick<ICreateNewUser, 'uid'>;

export const dbSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPhotos: builder.query<string[], { uid: string }>({
      queryFn: async ({ uid }) => {
        try {
          const firebaseCollection = collection(db, 'users', uid, 'entries');
          const result = await getDocs(firebaseCollection);

          const entries = result.docs.map((entry) => entry.id);

          return {
            data: entries,
          };
        } catch (e) {
          return handleApiError(e);
        }
      },
      providesTags: ['userPhotos'],
    }),
    getPhoto: builder.query<IDbEntry, { uid: string; date: string }>({
      queryFn: async ({ uid, date }) => {
        try {
          const firebaseCollection = collection(db, 'users', uid, 'entries');

          const q = query(firebaseCollection, where('__name__', '==', date));

          const firebaseDocuments = await getDocs(q);

          const retrievedDoc = firebaseDocuments.docs.map((document) =>
            document.data()
          );

          if (!retrievedDoc[0]) throw new Error('Запись не найдена!');

          const { imageUrl, minifiedImageUrl, mood, caption } = retrievedDoc[0];

          return {
            data: { imageUrl, minifiedImageUrl, mood, caption } as IDbEntry,
          };
        } catch (e) {
          return handleApiError(e);
        }
      },
      providesTags: ['photoEntry'],
    }),
    createNewEntry: builder.mutation<string, IDbEntry & { uid: string }>({
      queryFn: async ({
        uid,
        date,
        imageUrl,
        minifiedImageUrl,
        caption,
        mood,
      }) => {
        const successMessage = `Запись успешно создана!`;
        try {
          const newFirebaseObj = {
            timestamp: new Date(),
            imageUrl,
            minifiedImageUrl,
            caption,
            mood,
          };

          await setDoc(doc(db, 'users', uid, 'entries', date), newFirebaseObj);
          toast.success(successMessage);
          return { data: 'New entry created successfully' };
        } catch (e) {
          return handleApiError(e);
        }
      },
      invalidatesTags: ['userPhotos'],
    }),
    updateEntry: builder.mutation<string, UpdateEntry>({
      queryFn: async ({ uid, date, caption, mood }) => {
        const successMessage = `Данные успешно обновлены`;
        try {
          const newFirebaseObj: Partial<Pick<IDbEntry, 'mood' | 'caption'>> =
            {};

          if (caption) {
            newFirebaseObj.caption = caption;
          } else if (mood) {
            newFirebaseObj.mood = mood;
          }

          await updateDoc(
            doc(db, 'users', uid, 'entries', date),
            newFirebaseObj
          );

          toast.success(successMessage);
          return { data: 'Data updated successfully' };
        } catch (e) {
          return handleApiError(e);
        }
      },
      invalidatesTags: ['photoEntry'],
    }),

    createDbUser: builder.mutation<ICreateNewUserResult, ICreateNewUser>({
      queryFn: async ({ uid, email, avatar = null }) => {
        const successMessage = `Пользователь успешно создан`;
        try {
          await setDoc(doc(db, 'users', uid), {
            email,
            photos: [],
            settings: {
              avatar,
              theme: 'light',
            },
          });
          toast.success(successMessage);
          return { data: { created: true } };
        } catch (e) {
          return handleApiError(e);
        }
      },
    }),
    getUserId: builder.query<IIsUser, { uid: string }>({
      queryFn: async ({ uid }) => {
        try {
          const id = doc(db, 'users', uid);
          const snapshot = await getDoc(id);

          if (snapshot.exists()) return { data: { isUser: true } };

          return { data: { isUser: false } };
        } catch (e) {
          return handleApiError(e);
        }
      },
    }),
  }),
});

export const {
  useLazyGetUserIdQuery,
  useGetPhotoQuery,
  useGetPhotosQuery,
  useCreateDbUserMutation,
  useCreateNewEntryMutation,
  useUpdateEntryMutation,
} = dbSlice;
