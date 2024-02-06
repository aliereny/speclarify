"use client";
import { Button, Flex, Form, Input, Skeleton, Typography } from "antd";
import { RcFile } from "antd/lib/upload/interface";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import {
  fetchCurrentUserRequest,
  updateProfileRequest,
  User,
} from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { ImageUpload } from "@/ui/atoms/image-upload/imageUpload";

type FormData = {
  name: string;
  email: string;
  photo?: RcFile;
};

export const ProfilePage = () => {
  const { loading, currentUser } = useAppSelector((state) => state.user);

  const user = currentUser as User;

  const dispatch = useAppDispatch();

  const onFinish = (data: FormData) => {
    dispatch(updateProfileRequest(data));
  };

  useEffect(() => {
    dispatch(fetchCurrentUserRequest());
  }, []);

  return (
    <Flex vertical>
      <Typography.Title level={1}>My Profile</Typography.Title>
      {loading ? (
        <Skeleton active />
      ) : (
        <Form<FormData>
          layout={"vertical"}
          onFinish={onFinish}
          disabled={loading}
          initialValues={{
            name: user.name,
            email: user.email,
          }}
        >
          <Form.Item<FormData>
            name={"name"}
            label={"Name"}
            rules={[
              {
                required: true,
                message: "Name is required",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FormData>
            name={"email"}
            label={"Email"}
            rules={[
              {
                required: true,
                message: "Email is required",
              },
              {
                type: "email",
                message: "Please enter valid email",
              },
            ]}
          >
            <Input type={"email"} />
          </Form.Item>
          <Form.Item<FormData> name={"photo"} label={"Photo"}>
            <ImageUpload existing={user.photo} />
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
