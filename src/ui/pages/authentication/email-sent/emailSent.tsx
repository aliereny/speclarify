"use client";
import { StyledResult } from "@/ui/pages/authentication/email-sent/emailSent.styled";

export const EmailSent = () => {
  return (
    <StyledResult
      status="success"
      title="Email Sent"
      subTitle="We have sent an email to your email address. Please check your email and click on the link to verify
      your email address. If you don't receive the email within a few minutes, please check your spam folder."
    />
  );
};
