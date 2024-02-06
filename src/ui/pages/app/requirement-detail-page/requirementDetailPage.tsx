"use client";
import {
  Alert,
  Button,
  Descriptions,
  Flex,
  Popconfirm,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useEffect } from "react";
import { fetchRequirementRequest } from "@/redux/slices/requirementSlice";

export const RequirementDetailPage = () => {
  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;
  const requirementId = useParams().reqId as string;

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch({
      type: "deleteRequirementRequest",
      payload: {
        orgPath,
        projectPath,
        requirementId,
      },
    });
  };

  const { loading, currentRequirement } = useAppSelector(
    (state) => state.requirements,
  );

  useEffect(() => {
    dispatch(
      fetchRequirementRequest({
        orgPath,
        projectPath,
        requirementId,
      }),
    );
  }, []);

  return (
    <Flex vertical>
      <Typography.Title level={1}>Requirement Detail</Typography.Title>
      {loading ? (
        <Skeleton active />
      ) : currentRequirement ? (
        <Descriptions title="Requirement Info">
          <Descriptions.Item label="Identifier">
            {currentRequirement.identifier}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {currentRequirement.description}
          </Descriptions.Item>
          <Descriptions.Item label="Priority">
            {currentRequirement.priority}
          </Descriptions.Item>
          <Descriptions.Item label="Type">
            {currentRequirement.type}
          </Descriptions.Item>
          <Descriptions.Item label={"Actions"}>
            <Space>
              <Button
                href={`/organizations/${orgPath}/projects/${projectPath}/requirements/${requirementId}/edit`}
              >
                Edit
              </Button>
              <Popconfirm title={"Are you sure?"} onConfirm={handleDelete}>
                <Button danger>Delete</Button>
              </Popconfirm>
            </Space>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Alert message="Requirement not found" type="error" showIcon />
      )}
    </Flex>
  );
};
