import React from 'react';
import FirebaseAuthProvider from '@crema/services/auth/FirebaseAuthProvider';
import { useAppDispatch } from '../../toolkit/hooks';

import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from '@crema/constants';

type Props = {
  children: React.ReactNode;
};
const AppAuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();

  const fetchStart = () => {
    dispatch({ type: FETCH_START });
  };
  const fetchError = (message: string) => {
    dispatch({ type: FETCH_ERROR, payload: message });
  };
  const fetchSuccess = () => {
    dispatch({ type: FETCH_SUCCESS });
  };

  return (
    <FirebaseAuthProvider
      fetchStart={fetchStart}
      fetchError={fetchError}
      fetchSuccess={fetchSuccess}
    >
      {children}
    </FirebaseAuthProvider>
  );
};

export default AppAuthProvider;
