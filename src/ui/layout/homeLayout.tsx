"use client";
import StyledComponentsRegistry from "@/lib/registry";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { AppPersistor, AppStore } from "@/redux/appStore";
import { ConfigProvider } from "antd";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
