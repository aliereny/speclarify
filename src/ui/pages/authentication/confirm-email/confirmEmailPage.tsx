"use client";
import { Alert, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmailRequest } from "@/redux/slices/userSlice";

export const ConfirmEmailPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const dispatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (code) {
      dispatch(verifyEmailRequest({ code }));
    }
  }, [code]);

  return (
    <div>
      {loading && <Spin size="large" />}
      {!loading && (
        <Alert
          message="Invalid Code"
          description="Your email cannot be verified."
          type="error"
        />
      )}
    </div>
  );
};
