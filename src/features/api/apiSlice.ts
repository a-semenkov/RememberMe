import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { handleApiError } from '../errors/apiErrorHandling';
import { auth, provider } from '../../firebase/firebase';
import { IApiError, ICredentials, IUser } from './types';

export const apiSlice = createApi({
  reducerPath: 'firebaseApi',
  tagTypes: ['userPhotos', 'photoEntry'],
  baseQuery: fakeBaseQuery<IApiError>(),
  endpoints: (builder) => ({
    auth: builder.mutation<IUser, ICredentials>({
      async queryFn({ email, password }) {
        try {
          const user = await signInWithEmailAndPassword(auth, email, password);

          return {
            data: {
              id: user.user.uid,
              email: user.user.email,
              avatar: user.user.photoURL,
            },
          };
        } catch (e) {
          return handleApiError(e);
        }
      },
    }),
    // firebaseSubscribtion: builder.mutation<unsubscribeFn, void>({
    //   async queryFn() {
    //     const dispatch = useDispatch();
    //     try {
    //       const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         if (currentUser) {
    //           dispatch(
    //             login({
    //               id: currentUser.uid,
    //               user: currentUser.email,
    //               name: currentUser.displayName,
    //               photo: currentUser.photoURL,
    //             })
    //           );
    //         } else {
    //           dispatch(logOut());
    //         }
    //       });
    //       return { data: unsubscribe };
    //     } catch (e) {
    //       return handleApiError(e);
    //     }

    //     // } catch (e) {
    //     //   return handleApiError(e)
    //     // }
    //     // try {
    //     //   const user = await signInWithEmailAndPassword(auth, email, password);
    //     //   console.log(user);
    //     //   return {
    //     //     data: {
    //     //       id: user.user.uid,
    //     //       email: user.user.email,
    //     //     },
    //     //   };
    //     // } catch (e) {
    //     //   return handleApiError(e);
    //     // }
    //   },
    // }),
    authWithGoogle: builder.mutation<IUser, void>({
      async queryFn() {
        try {
          const userCredentials = await signInWithPopup(auth, provider);

          return {
            data: {
              id: userCredentials.user.uid,
              email: userCredentials.user.email,
              avatar: userCredentials.user.photoURL,
            },
          };
        } catch (e: unknown) {
          return handleApiError(e);
        }
      },
    }),
    createUser: builder.mutation<IUser, ICredentials>({
      async queryFn({ email, password }) {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          return {
            data: {
              id: user.user.uid,
              email: user.user.email,
            },
          };
        } catch (e: unknown) {
          return handleApiError(e);
        }
      },
    }),
  }),
});

export const {
  useAuthMutation,
  useCreateUserMutation,
  useAuthWithGoogleMutation,
} = apiSlice;
