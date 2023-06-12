import React from "react";
import AppPage from "../../../core/AppLayout/AppPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const MyProfile = asyncComponent(() =>
  import('../../../modules/account/MyProfile'),
);
export default AppPage(() => <MyProfile />);
