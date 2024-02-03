'use client';
import React from 'react';
import JWTAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';

type Props = {
  children: React.ReactNode;
};
const AppAuthProvider = ({ children }: Props) => {

  return (
    <JWTAuthProvider
    >
      {children}
    </JWTAuthProvider>
  );
};

export default AppAuthProvider;
