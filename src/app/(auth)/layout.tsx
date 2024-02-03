'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { initialUrl } from '@crema/constants/AppConst';
import AppLoader from '@crema/components/AppLoader';
import { useLayoutActionsContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import AuthLayout from './AuthLayout';
import { useAppSelector } from '../../redux/appStore';

export default function RootLayout({ children }: any) {
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const searchParams = useSearchParams();
  const {currentUser, loading} = useAppSelector((state) => state.user);
  const layout = searchParams.get('layout');
  const menuStyle = searchParams.get('menuStyle');
  const sidebarImage = searchParams.get('sidebarImage');
  const queryParams = searchParams.toString();
  const router = useRouter();

  useEffect(() => {
    if (layout) updateNavStyle(layout);
    if (menuStyle) updateMenuStyle(menuStyle);
    if (sidebarImage) setSidebarBgImage(true);
  }, [layout, menuStyle, sidebarImage, updateMenuStyle, updateNavStyle]);

  useEffect(() => {
    if (currentUser) {
      router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
    }
  }, [queryParams, currentUser]);

  if (loading || currentUser) return <AppLoader />;

  return <AuthLayout>{children}</AuthLayout>;
}
