import React from "react";
import AppPage from "@crema/core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const UnlockScreen = asyncComponent(
  () => import("../../../modules/userPages/UserPages/UnlockScreen")
);
export default AppPage(() => <UnlockScreen />);
