"use client";
import { Button, Checkbox, Flex, Form, Input, Space, Typography } from "antd";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { signInRequest } from "@/redux/slices/userSlice";
import { StyledFormFooter } from "@/ui/pages/authentication/authentication.styled";

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const SignInPage = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const onFinish = (values: FormValues) => {
    dispatch(signInRequest(values));
  };

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={2}>Sign In</Typography.Title>
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
        <Button type={"primary"} htmlType={"submit"} block>
          Sign In
        </Button>
        <StyledFormFooter>
          <Typography.Text>
            {"Don't"} have an account? Click <Link href={"/signup"}>here</Link>{" "}
            to sign up.
          </Typography.Text>
        </StyledFormFooter>
      </Form>
    </Flex>
  );
};
