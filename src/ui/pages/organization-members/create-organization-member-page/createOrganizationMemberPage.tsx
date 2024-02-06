"use client";

import { Button, Flex, Form, Input, Select, Typography } from "antd";
import {
  createOrganizationMemberRequest,
  OrganizationRole,
} from "@/redux/slices/organizationMemberSlice";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";

type FormValues = {
  email: string;
  role: OrganizationRole;
};

export const CreateOrganizationMemberPage = () => {
  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;

  const onFinish = (values: FormValues) => {
    dispatch(createOrganizationMemberRequest({ ...values, orgPath }));
  };

  const { loading } = useAppSelector((state) => state.organizationMembers);

  return (
    <Flex vertical>
      <Typography.Title level={2}>Create Organization Member</Typography.Title>
      <Form<FormValues>
        layout={"vertical"}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item<FormValues>
          label={"E-mail"}
          name="email"
          rules={[
            {
              required: true,
              message: "E-mail is required",
            },
            {
              type: "email",
              message: "Invalid e-mail",
            },
          ]}
        >
          <Input placeholder={"E-mail"} />
        </Form.Item>
        <Form.Item<FormValues>
          label={"Role"}
          name={"role"}
          rules={[
            {
              required: true,
              message: "Role is required",
            },
          ]}
        >
          <Select
            placeholder={"Role"}
            options={[
              { label: "Admin", value: OrganizationRole.Admin },
              { label: "Editor", value: OrganizationRole.Editor },
              { label: "Viewer", value: OrganizationRole.Viewer },
            ]}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Create
        </Button>
      </Form>
    </Flex>
  );
};
