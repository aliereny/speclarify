"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/appStore";
import { AuthNav } from "@/ui/organisms/auth-nav/authNav";
import {
  StyledDashboardContentWrapper,
  StyledDashboardLayout,
} from "@/ui/layout/dashboardLayout/dashboardLayout.styled";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { accessToken } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.push("/");
    }
  }, [accessToken]);

  return (
    <StyledDashboardLayout>
      <AuthNav />
      <StyledDashboardContentWrapper>{children}</StyledDashboardContentWrapper>
    </StyledDashboardLayout>
  );
};
