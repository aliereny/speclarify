'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AppLoader from '@crema/components/AppLoader';
import routesConfig from '@crema/core/AppRoutes/routeConfig';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { useLayoutActionsContext, useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useAppSelector } from '../../redux/appStore';
import DefaultLayout from '@crema/components/AppLayout/Default';

export default function RootLayout({ children }: any) {
  const { navStyle } = useLayoutContext();
  const AppLayout = DefaultLayout;

  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const searchParams = useSearchParams();

  const { currentUser, loading, accessToken } = useAppSelector(state => state.user);
  const router = useRouter();
  const layout = searchParams.get('layout');
  const menuStyle = searchParams.get('menuStyle');
  const sidebarImage = searchParams.get('sidebarImage');
  const queryParams = searchParams.toString();

  useEffect(() => {
    if (!currentUser && !loading) {
      router.push('/signin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [currentUser, loading, queryParams]);

  useEffect(() => {
    if (layout) updateNavStyle(layout);
    if (menuStyle) updateMenuStyle(menuStyle);
    if (sidebarImage) setSidebarBgImage(true);
  }, []);

  if (!currentUser || loading) return <AppLoader />;

  return <AppLayout routesConfig={routesConfig}>{children}</AppLayout>;
}
