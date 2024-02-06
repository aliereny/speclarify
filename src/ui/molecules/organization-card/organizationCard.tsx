import { Organization } from "@/redux/slices/organizationSlice";
import React from "react";
import { Avatar, Space } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

export interface Props {
  organization: Organization;
}

export const OrganizationCard = ({ organization }: Props) => {
  return (
    <div>
      <Avatar src={organization.photo}>
        {organization.photo
          ? ""
          : organization.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
      </Avatar>
      <h2>{organization.name}</h2>
      <Space>
        <MailOutlined />
        <span>{organization.email}</span>
      </Space>
      <Space>
        <EnvironmentOutlined />
        <span>{organization.address}</span>
      </Space>
      <Space>
        <PhoneOutlined />
        <span>{organization.phoneNumber}</span>
      </Space>
      <Space>
        <LinkOutlined />
        <span>{organization.website}</span>
      </Space>
      <Space>
        <CalendarOutlined />
        <span>
          Created on{" "}
          {new Date(organization.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </Space>
    </div>
  );
};
