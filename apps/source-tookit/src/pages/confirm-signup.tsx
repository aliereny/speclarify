import React from "react";
import AppPage from "../core/DefaultPage";
import asyncComponent from "@crema/components/AppAsyncComponent";

const ConfirmSignup = asyncComponent(() =>
  import('../modules/auth/Signup/ConfirmSignupAwsCognito')
);
export default AppPage(() => <ConfirmSignup />);
