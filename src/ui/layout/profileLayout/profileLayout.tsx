"use client";
import {
  StyledProfileContentWrapper,
  StyledProfileLayout,
} from "@/ui/layout/profileLayout/profileLayout.styled";
import { ProfileNav } from "@/ui/organisms/profile-nav/profileNav";

export const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledProfileLayout>
      <ProfileNav />
      <StyledProfileContentWrapper>{children}</StyledProfileContentWrapper>
    </StyledProfileLayout>
  );
};
