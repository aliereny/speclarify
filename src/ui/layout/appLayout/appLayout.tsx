"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/appStore";
import { AuthNav } from "@/ui/organisms/auth-nav/authNav";
import { AppNav } from "@/ui/organisms/app-nav/appNav";
import {
  StyledAppContentWrapper,
  StyledAppLayout,
} from "@/ui/layout/appLayout/appLayout.styled";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledAppLayout>
      <AppNav />
      <StyledAppContentWrapper>{children}</StyledAppContentWrapper>
    </StyledAppLayout>
  );
};
