import React from 'react';
import { useSelector } from 'react-redux';
import { userLoggedIn } from '../user/userSlice';

import useFirebaseAuth from './hooks/useFirebaseAuth';
import Auth from './Auth';
import Loader from '../loader/Loader';

// eslint-disable-next-line no-undef
export default function RequireAuth({ children }: { children: JSX.Element }) {
  const isUserLoggedIn = useSelector(userLoggedIn);
  const { loading } = useFirebaseAuth();

  if (loading) return <Loader />;

  return isUserLoggedIn ? children : <Auth />;
}
