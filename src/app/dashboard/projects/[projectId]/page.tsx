"use client";
import React, { useEffect, useState } from "react";
import { Alert, Button, message, Spin, Table, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProjectStore } from "@/stores/projectStore";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { useRouter } from "next/navigation";
import { RcFile } from "antd/es/upload";
import styles from "./ProjectPage.module.scss";

export default function ProjectPage({
  params,
}: {
  params: { projectId: number };
}) {
  const { projectId } = params;
  const router = useRouter();
  const { projects } = useProjectStore();
  const { requirements, loading, error, fetchRequirements, parsePdf } =
    useRequirementsStore();
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchRequirements(projectId);
  }, [projectId]);

  const project = projects.find((p) => p.id === projectId);

  const handleUpload = async (file: RcFile) => {
    setIsUploading(true);
    try {
      await parsePdf(projectId, file);
      message.success("Document processed successfully");
      fetchRequirements(projectId);
    } catch (error) {
      message.error("Failed to process document");
    } finally {
      setIsUploading(false);
    }
    return false;
  };

  const columns = [
    { title: "Requirement", dataIndex: "text", key: "text" },
    // Add more columns as needed
  ];

  if (loading) {
    return (
      <div className={styles.center}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.center}>
        <Alert message="Error" description={error} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className={styles.projectPage}>
      <h1>{project?.name}</h1>
      <p>Project ID: {projectId}</p>

      {requirements.length === 0 ? (
        <div className={styles.uploadSection}>
          <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button
              icon={<UploadOutlined />}
              loading={isUploading}
              size="large"
            >
              Upload SRS Document (PDF)
            </Button>
          </Upload>
        </div>
      ) : (
          <Table dataSource={requirements} columns={columns} rowKey="id" />
      )}
    </div>
  );
}
