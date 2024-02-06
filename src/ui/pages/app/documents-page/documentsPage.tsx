"use client";
import { Button, Flex, Popconfirm, Space, Table, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import {
  deleteDocumentRequest,
  DocumentType,
  fetchDocumentsRequest,
} from "@/redux/slices/documentSlice";

export const DocumentsPage = () => {
  const { documents } = useAppSelector((state) => state.documents);

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchDocumentsRequest({
        orgPath,
        projectPath,
      }),
    );
  }, []);

  const handleDelete = (id: string) => {
    dispatch(
      deleteDocumentRequest({
        orgPath,
        projectPath,
        documentId: id,
      }),
    );
  };

  return (
    <Flex vertical>
      <Flex justify={"space-between"}>
        <Typography.Title level={1}>Documents</Typography.Title>
        <Button
          type={"primary"}
          href={`/organizations/${orgPath}/projects/${projectPath}/documents/new`}
        >
          Create Document
        </Button>
      </Flex>

      <Table
        dataSource={documents}
        rowKey={"id"}
        columns={[
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
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
            render: (text, record: DocumentType) => (
              <Space>
                <Button type={"primary"} href={record.url}>
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
