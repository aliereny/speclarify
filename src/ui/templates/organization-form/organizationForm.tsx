"use client";
import {
  CreateOrganizationRequestPayload,
  Organization,
} from "@/redux/slices/organizationSlice";
import { Button, Form, Input } from "antd";
import { ImageUpload } from "@/ui/atoms/image-upload/imageUpload";
import { useAppSelector } from "@/redux/appStore";

type Props = {
  selectedOrganization?: Organization;
  onSave: (data: CreateOrganizationRequestPayload) => void;
  title: string;
};

export const OrganizationForm = ({
  selectedOrganization,
  onSave,
  title,
}: Props) => {
  const { loading } = useAppSelector((state) => state.organizations);

  return (
    <div>
      <h1>{title}</h1>
      <Form<CreateOrganizationRequestPayload>
        style={{
          maxWidth: 500,
        }}
        disabled={loading}
        initialValues={
          selectedOrganization
            ? {
                ...selectedOrganization,
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
      >
        <Form.Item
          name="name"
          label="Organization Name"
          rules={[
            {
              required: true,
              message: "Organization Name is required",
            },
            {
              max: 40,
              message: "Name must be less than 40 characters",
            },
          ]}
        >
          <Input placeholder="Organization Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "Please enter valid email!",
            },
            {
              max: 80,
              message: "Email must be less than 80 characters",
            },
          ]}
        >
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Phone number is required",
            },
          ]}
        >
          <Input placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: "Address is required",
            },
            {
              max: 255,
              message: "Address must be less than 255 characters",
            },
          ]}
        >
          <Input.TextArea placeholder="Address" />
        </Form.Item>
        <Form.Item
          name="website"
          label="Website"
          rules={[
            {
              required: true,
              message: "Website is required",
            },
            {
              max: 255,
              message: "Website must be less than 255 characters",
            },
          ]}
        >
          <Input placeholder="Website" />
        </Form.Item>
        <Form.Item name="photo" label="Photo">
          <ImageUpload existing={selectedOrganization?.photo} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {selectedOrganization ? "Edit" : "Add"} Organization
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
