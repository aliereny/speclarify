"use client";
import { Button, Flex, Form, Input, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import { createRequirementRequest } from "@/redux/slices/requirementSlice";

type FormData = {
  identifier: string;
  description: string;
};

export const RequirementCreatePage = () => {
  const { loading } = useAppSelector((state) => state.requirements);
  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const onFinish = (data: FormData) => {
    dispatch(
      createRequirementRequest({
        orgPath,
        projectPath,
        identifier: data.identifier,
        description: data.description,
      }),
    );
  };

  return (
    <Flex vertical>
      <Typography.Title level={1}>Create Requirement</Typography.Title>
      <Form<FormData>
        layout={"vertical"}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item<FormData>
          name={"identifier"}
          label={"Identifier"}
          rules={[
            {
              required: true,
              message: "Identifier is required",
            },
          ]}
        >
          <Input placeholder={"Identifier"} />
        </Form.Item>
        <Form.Item<FormData>
          name={"description"}
          label={"Description"}
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
        >
          <Input.TextArea placeholder={"Description"} />
        </Form.Item>
        <Form.Item>
          <Button type={"primary"} htmlType={"submit"}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
