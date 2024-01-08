"use client";

import React, { useEffect, useState } from "react";
import { Project, useProjectStore } from "@/stores/projectStore";
import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Skeleton,
  Table,
} from "antd";
import { useIsClient } from "@/hooks/useIsClient";

export default function DashboardPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const {
    loading,
    projects,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  } = useProjectStore();

  const isClient = useIsClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  const showModal = (project: Project | null) => {
    setEditingProject(project);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditingProject(null);
    setIsModalVisible(false);
  };

  const handleFinish = async (values: { name: string }) => {
    if (editingProject) {
      await updateProject(editingProject.id, values.name);
      message.success("Project updated successfully");
    } else {
      await addProject(values.name);
      message.success("Project added successfully");
    }
    setIsModalVisible(false);
    setEditingProject(null);
  };

  const handleDelete = async (projectId: number) => {
    await deleteProject(projectId);
    message.success("Project deleted successfully");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Project) => (
        <>
          <Button onClick={() => showModal(record)} type="link">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  if (!isClient || loading) {
    return <Skeleton active />;
  }

  return (
    <div className="projects-page">
      <Button type="primary" onClick={() => showModal(null)}>
        Add Project
      </Button>
      <Table dataSource={projects} columns={columns} rowKey="id" />

      <Modal
        title={editingProject ? "Edit Project" : "Add Project"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={
            editingProject ? { name: editingProject.name } : { name: "" }
          }
          onFinish={handleFinish}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input the project name!" },
            ]}
          >
            <Input placeholder="Project Name" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            {editingProject ? "Update" : "Add"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
