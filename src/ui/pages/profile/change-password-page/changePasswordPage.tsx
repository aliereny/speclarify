"use client";
import { Button, Flex, Form, Input, Skeleton, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { changePasswordRequest } from "@/redux/slices/userSlice";

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const ChangePasswordPage = () => {
  const { loading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const onFinish = (data: FormData) => {
    dispatch(changePasswordRequest(data));
  };

  return (
    <Flex vertical>
      <Typography.Title level={1}>Change Password</Typography.Title>
      {loading ? (
        <Skeleton active />
      ) : (
        <Form<FormData>
          layout={"vertical"}
          onFinish={onFinish}
          disabled={loading}
        >
          <Form.Item<FormData>
            name={"currentPassword"}
            label={"Current Password"}
            rules={[
              {
                required: true,
                message: "Current Password is required",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FormData>
            name={"newPassword"}
            label={"New Password"}
            rules={[
              {
                required: true,
                message: "New Password is required",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<FormData>
            name={"confirmPassword"}
            label={"Confirm Password"}
            rules={[
              {
                required: true,
                message: "Confirm Password is required",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type={"primary"} htmlType={"submit"}>
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </Flex>
  );
};
