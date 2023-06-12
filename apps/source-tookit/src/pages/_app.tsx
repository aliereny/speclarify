import * as React from 'react';
import PropTypes from 'prop-types';
import AppContextProvider from '@crema/context/AppContextProvider';
import AppThemeProvider from '@crema/context/AppThemeProvider';
import AppLocaleProvider from '@crema/context/AppLocaleProvider';
import AppAuthProvider from '../core/AppAuthProvider';
import AuthRoutes from '@crema/components/AuthRoutes';
import '@crema/mockapi';
import AppPageMeta from '@crema/components/AppPageMeta';
import { store } from '../toolkit/store';
import { Provider } from 'react-redux';
import 'antd/dist/reset.css';
import '../../public/styles/index.css';
import { GlobalStyles } from '../core/theme/GlobalStyle';
import { Normalize } from 'styled-normalize';
import { AppProps } from 'next/app';

// Client-side cache, shared for the whole session of the user in the browser.

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <AppContextProvider>
        <AppThemeProvider>
          <AppLocaleProvider>
            <AppAuthProvider>
              <AuthRoutes>
                <GlobalStyles />
                <Normalize />
                <AppPageMeta />
                <Component {...pageProps} />
              </AuthRoutes>
            </AppAuthProvider>
          </AppLocaleProvider>
        </AppThemeProvider>
      </AppContextProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
