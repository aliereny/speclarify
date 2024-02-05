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
import { signInRequest, signUpRequest } from "@/redux/slices/userSlice";
import { ImageUpload } from "@/ui/atoms/image-upload/imageUpload";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo?: Blob;
};

export const SignUpPage = () => {
  const dipatch = useAppDispatch();

  const { error, loading } = useAppSelector((state) => state.user);

  const onFinish = (values: FormValues) => {
    dipatch(signUpRequest(values));
  };

  const [form] = Form.useForm();

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
        <Form.Item<FormValues> name={"photo"} initialValue={true}>
          <ImageUpload />
        </Form.Item>
        <Button type={"primary"} htmlType={"submit"}>
          Sign Up
        </Button>
        <div>
          <Link href={"/signin"}>Sign In</Link>
        </div>
      </Form>
    </Flex>
  );
};
