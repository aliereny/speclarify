"use client";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Button, Flex, Popconfirm, Space, Table, Typography } from "antd";
import {
  deleteRequirementRequest,
  fetchRequirementsRequest,
  Requirement,
} from "@/redux/slices/requirementSlice";

export const RequirementsPage = () => {
  const { requirements, loading } = useAppSelector(
    (state) => state.requirements,
  );

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchRequirementsRequest({
        orgPath,
        projectPath,
        pageSize: 10,
        pageNumber: 1,
      }),
    );
  }, []);

  const handleDelete = (id: string) => {
    dispatch(
      deleteRequirementRequest({
        orgPath,
        projectPath,
        requirementId: id,
      }),
    );
  };

  return (
    <Flex vertical>
      <Flex justify={"space-between"}>
        <Typography.Title level={1}>Requirements</Typography.Title>
        <Button
          type={"primary"}
          href={`/organizations/${orgPath}/projects/${projectPath}/requirements/new`}
        >
          Create Document
        </Button>
      </Flex>

      <Table
        dataSource={requirements.items}
        loading={loading}
        rowKey={"id"}
        pagination={{
          total: requirements.totalItems,
          current: requirements.currentPage,
          pageSize: requirements.pageSize,
          onChange: (pageNumber, pageSize) => {
            dispatch(
              fetchRequirementsRequest({
                orgPath,
                projectPath,
                pageSize,
                pageNumber,
              }),
            );
          },
        }}
        columns={[
          {
            title: "Identifier",
            dataIndex: "identifier",
            key: "identifier",
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
          },
          {
            title: "Priority",
            dataIndex: "priority",
            key: "priority",
          },
          {
            title: "Type",
            dataIndex: "type",
            key: "type",
          },
          {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text: string) =>
              new Date(text).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
          },
          {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (text, record: Requirement) => (
              <Space>
                <Button
                  type={"primary"}
                  href={`/organizations/${orgPath}/projects/${projectPath}/requirements/${record.id}`}
                >
                  View
                </Button>
                <Popconfirm
                  title={"Are you sure?"}
                  onConfirm={() => handleDelete(record.id)}
                >
                  <Button
                    type="primary"
                    danger
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />
    </Flex>
  );
};
