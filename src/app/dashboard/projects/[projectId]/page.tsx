"use client";
import React, { useEffect, useState } from "react";
import { Button, message, Table, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useProjectStore } from "@/stores/projectStore";
import { useRequirementsStore } from "@/stores/requirementsStore";
import { useRouter } from "next/navigation";
import { RcFile } from "antd/es/upload";

export default function ProjectPage({
  params,
}: {
  params: { projectId: number };
}) {
  const { projectId } = params;
  const router = useRouter();
  const { projects } = useProjectStore();
  const { requirements, fetchRequirements, parsePdf } = useRequirementsStore();
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
  };

  const columns = [
    { title: "Requirement", dataIndex: "text", key: "text" },
    // Add more columns as needed
  ];

  return (
    <div className="project-page">
      <h1>{project?.name}</h1>
      <p>Project ID: {projectId}</p>

      <Upload
        beforeUpload={(file) => {
          handleUpload(file);
          return false;
        }}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} loading={isUploading}>
          Upload SRS Document (PDF)
        </Button>
      </Upload>

      <Table dataSource={requirements} columns={columns} rowKey="id" />

      <Button onClick={() => fetchRequirements(projectId)}>
        Refresh Requirements
      </Button>

      <Button onClick={() => router.push("/dashboard")}>
        Back to Dashboard
      </Button>
    </div>
  );
}
