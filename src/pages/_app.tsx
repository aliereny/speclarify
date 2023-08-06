import * as React from "react";
import PropTypes from "prop-types";
import AppContextProvider from "@crema/context/AppContextProvider";
import AppThemeProvider from "@crema/context/AppThemeProvider";
import AppLocaleProvider from "@crema/context/AppLocaleProvider";
import AppAuthProvider from "@crema/core/AppAuthProvider";
import AuthRoutes from "@crema/components/AuthRoutes";
import "@crema/mockapi";
import AppPageMeta from "@crema/components/AppPageMeta";
import InfoViewContextProvider from "@crema/context/AppContextProvider/InfoViewContextProvider";
import "antd/dist/reset.css";
import "../../public/styles/index.css";
import { GlobalStyles } from "@crema/core/theme/GlobalStyle";
import { Normalize } from "styled-normalize";
import { AppProps } from "next/app";

// Client-side cache, shared for the whole session of the user in the browser.

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppContextProvider>
      <AppThemeProvider>
        <AppLocaleProvider>
          <InfoViewContextProvider>
            <AppAuthProvider>
              <AuthRoutes>
                <AppPageMeta />
                <GlobalStyles />
                <Normalize />
                <Component {...pageProps} />
              </AuthRoutes>
            </AppAuthProvider>
          </InfoViewContextProvider>
        </AppLocaleProvider>
      </AppThemeProvider>
    </AppContextProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
