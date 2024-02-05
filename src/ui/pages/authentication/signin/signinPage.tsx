"use client";
import {
  Alert,
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  Space,
  Typography,
} from "antd";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { signInRequest } from "@/redux/slices/userSlice";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const SignInPage = () => {
  const dipatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.user);

  const onFinish = (values: FormValues) => {
    dipatch(signInRequest(values));
  };

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={2}>Sign In</Typography.Title>
      {error && (
        <Alert
          message={"Error"}
          description={error}
          type={"error"}
          showIcon
          closable
        />
      )}
      <Form<FormValues>
        layout={"vertical"}
        disabled={loading}
        onFinish={onFinish}
      >
        <Form.Item<FormValues>
          label={"E-mail"}
          name={"email"}
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input placeholder={"E-mail"} />
        </Form.Item>
        <Form.Item<FormValues>
          label={"Password"}
          name={"password"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password placeholder={"Password"} />
        </Form.Item>
        <Form.Item<FormValues> name={"rememberMe"} initialValue={true}>
          <Space>
            <Checkbox />
            <Typography.Text>Remember me</Typography.Text>
          </Space>
        </Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          Sign In
        </Button>
        <div>
          <Link href={"/forgot-password"}>Forgot Password?</Link>
        </div>
        <div>
          <Link href={"/signup"}>Sign Up</Link>
        </div>
      </Form>
    </Flex>
  );
};
