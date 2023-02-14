import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../../firebase/firebase';
import { login, logOut } from '../../user/userSlice';

const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);

      if (currentUser) {
        dispatch(
          login({
            id: currentUser.uid,
            user: currentUser.email,
            name: currentUser.displayName,
            photo: currentUser.photoURL,
          })
        );
      } else {
        dispatch(logOut());
      }
    });
    return () => unsubscribe();
  }, []);

  return { loading };
};

export default useFirebaseAuth;
