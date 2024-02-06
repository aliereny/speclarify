"use client";
import { Organization } from "@/redux/slices/organizationSlice";
import React from "react";
import { Avatar, Space, Typography } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { StyledOrganizationCard } from "@/ui/molecules/organization-card/organizationCard.styled";
import { useRouter } from "next/navigation";

export interface Props {
  organization: Organization;
}

export const OrganizationCard = ({ organization }: Props) => {
  const router = useRouter();
  return (
    <StyledOrganizationCard
      onClick={() => router.push(`organizations/${organization.path}`)}
    >
      <Avatar src={organization.photo} shape={"square"} size={100}>
        {organization.photo
          ? ""
          : organization.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
      </Avatar>
      <Typography.Title level={3}>{organization.name}</Typography.Title>
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
    </StyledOrganizationCard>
  );
};
