"use client";
import { Button, Flex, Form, Input, Typography } from "antd";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { signUpRequest } from "@/redux/slices/userSlice";
import { ImageUpload } from "@/ui/atoms/image-upload/imageUpload";
import { StyledFormFooter } from "@/ui/pages/authentication/authentication.styled";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo?: Blob;
};

export const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.user);

  const onFinish = (values: FormValues) => {
    dispatch(signUpRequest(values));
  };

  const [form] = Form.useForm();

  return (
    <Flex vertical gap={8}>
      <Typography.Title level={2}>Sign In</Typography.Title>
      <Form<FormValues>
        layout={"vertical"}
        disabled={loading}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item<FormValues>
          label={"Full name"}
          name={"name"}
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input placeholder={"Full name"} />
        </Form.Item>
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
        <Form.Item<FormValues>
          label={"Confirm Password"}
          name={"confirmPassword"}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            {
              validator: (_, value) => {
                if (value !== form.getFieldValue("password")) {
                  return Promise.reject(
                    "The two passwords that you entered do not match!",
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password placeholder={"Password"} />
        </Form.Item>
        <Form.Item<FormValues> name={"photo"} label={"Profile Photo"}>
          <ImageUpload />
        </Form.Item>
        <Button type={"primary"} htmlType={"submit"} block>
          Sign Up
        </Button>
        <StyledFormFooter>
          <Typography.Text>
            Already have an account? Click <Link href={"/signin"}>here</Link> to
            sign in.
          </Typography.Text>
        </StyledFormFooter>
      </Form>
    </Flex>
  );
};
