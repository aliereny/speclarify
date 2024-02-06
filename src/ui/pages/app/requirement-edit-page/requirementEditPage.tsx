"use client";
import {
  Alert,
  Button,
  Flex,
  Form,
  Input,
  Select,
  Skeleton,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import {
  fetchRequirementRequest,
  Priority,
  RequirementType,
  updateRequirementRequest,
} from "@/redux/slices/requirementSlice";
import { useEffect } from "react";

type FormData = {
  identifier: string;
  description: string;
  type: RequirementType;
  priority: Priority;
};

export const RequirementEditPage = () => {
  const { loading, currentRequirement } = useAppSelector(
    (state) => state.requirements,
  );
  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;
  const requirementId = useParams().reqId as string;

  useEffect(() => {
    dispatch(
      fetchRequirementRequest({
        orgPath,
        projectPath,
        requirementId,
      }),
    );
  }, []);

  const onFinish = (data: FormData) => {
    dispatch(
      updateRequirementRequest({
        orgPath,
        projectPath,
        identifier: data.identifier,
        description: data.description,
        requirementId,
        type: data.type,
        priority: data.priority,
      }),
    );
  };

  return (
    <Flex vertical>
      <Typography.Title level={1}>Edit Requirement</Typography.Title>
      {loading ? (
        <Skeleton active />
      ) : currentRequirement ? (
        <Form<FormData>
          layout={"vertical"}
          onFinish={onFinish}
          disabled={loading}
          initialValues={{
            identifier: currentRequirement.identifier,
            description: currentRequirement.description,
            type: currentRequirement.type,
            priority: currentRequirement.priority,
          }}
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
          <Form.Item<FormData>
            name={"type"}
            label={"Type"}
            rules={[
              {
                required: true,
                message: "Type is required",
              },
            ]}
          >
            <Select
              placeholder={"Select Type"}
              options={Object.values(RequirementType).map((type) => ({
                label: type,
                value: type,
              }))}
            />
          </Form.Item>
          <Form.Item<FormData>
            name={"priority"}
            label={"Priority"}
            rules={[
              {
                required: true,
                message: "Priority is required",
              },
            ]}
          >
            <Select
              placeholder={"Select Priority"}
              options={Object.values(Priority).map((priority) => ({
                label: priority,
                value: priority,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button type={"primary"} htmlType={"submit"}>
              Update
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Alert message="Requirement not found" type="error" showIcon />
      )}
    </Flex>
  );
};
