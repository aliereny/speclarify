"use client";
import StyledComponentsRegistry from "@/lib/registry";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppPersistor, AppStore } from "@/redux/appStore";
import { ConfigProvider } from "antd";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={AppStore}>
      <PersistGate persistor={AppPersistor}>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "Poppins, sans-serif",
            },
          }}
        >
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
};
