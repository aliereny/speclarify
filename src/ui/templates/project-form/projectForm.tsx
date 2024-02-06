"use client";
import {
  CreateProjectRequestPayload,
  Project,
} from "@/redux/slices/projectSlice";
import { Button, Form, Input } from "antd";
import { ImageUpload } from "@/ui/atoms/image-upload/imageUpload";
import { useAppSelector } from "@/redux/appStore";

type Props = {
  selectedProject?: Project;
  onSave: (data: CreateProjectRequestPayload) => void;
  title: string;
};

export const ProjectForm = ({ selectedProject, onSave, title }: Props) => {
  const { loading } = useAppSelector((state) => state.projects);

  return (
    <div>
      <h1>{title}</h1>
      <Form<CreateProjectRequestPayload>
        style={{
          maxWidth: 500,
        }}
        initialValues={
          selectedProject
            ? {
                ...selectedProject,
                photo: undefined,
              }
            : {
                name: "",
                email: "",
                phoneNumber: "",
                address: "",
                website: "",
              }
        }
        layout="vertical"
        onFinish={onSave}
        disabled={loading}
      >
        <Form.Item<CreateProjectRequestPayload>
          name="name"
          label="Project Name"
          rules={[
            {
              required: true,
              message: "Project Name is required",
            },
            {
              max: 40,
              message: "Name must be less than 40 characters",
            },
          ]}
        >
          <Input placeholder="Project Name" />
        </Form.Item>
        <Form.Item<CreateProjectRequestPayload>
          name={"description"}
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input project description!",
            },
            {
              max: 255,
              message: "Description must be less than 255 characters",
            },
          ]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item<CreateProjectRequestPayload> name="photo" label="Photo">
          <ImageUpload existing={selectedProject?.photo} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedProject ? "Edit" : "Add"} Project
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
