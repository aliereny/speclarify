import React, { ReactNode } from 'react';
import AppLoader from './AppLoader';
import { useAppSelector } from '../../redux/appStore';

type AuthRoutesProps = {
  children: ReactNode;
};

const AuthRoutes: React.FC<AuthRoutesProps> = ({ children }) => {
  const isLoading = useAppSelector((state) => state.user.loading);
  return isLoading ? <AppLoader /> : <>{children}</>;
};

export default AuthRoutes;
