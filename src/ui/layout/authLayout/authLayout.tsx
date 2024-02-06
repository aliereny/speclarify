"use client";
import { AuthNav } from "@/ui/organisms/auth-nav/authNav";
import {
  StyledAuthLayout,
  StyledFormWrapper,
} from "@/ui/layout/authLayout/authLayout.styled";
import { useAppSelector } from "@/redux/appStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (accessToken) {
      router.push("/organizations");
    }
  }, [accessToken]);

  return (
    <StyledAuthLayout>
      <AuthNav />
      <StyledFormWrapper>{children}</StyledFormWrapper>
    </StyledAuthLayout>
  );
};
