"use client";
import { Project } from "@/redux/slices/projectSlice";
import React from "react";
import { Avatar, Space, Typography } from "antd";
import { CalendarOutlined, FileTextOutlined } from "@ant-design/icons";
import {
  StyledProjectCard,
  StyledProjectImage,
} from "@/ui/molecules/project-card/projectCard.styled";
import { useParams, useRouter } from "next/navigation";

export interface Props {
  project: Project;
}

export const ProjectCard = ({ project }: Props) => {
  const router = useRouter();
  const orgPath = useParams().orgPath as string;
  return (
    <StyledProjectCard
      onClick={() =>
        router.push(`/organizations/${orgPath}/projects/${project.path}`)
      }
    >
      {project.photo ? (
        <StyledProjectImage src={project.photo} />
      ) : (
        <Avatar shape={"square"} size={100}>
          {project.name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()}
        </Avatar>
      )}
      <Typography.Title level={3}>{project.name}</Typography.Title>
      <Space>
        <FileTextOutlined />
        <span>{project.description}</span>
      </Space>
      <Space>
        <CalendarOutlined />
        <span>
          Created on{" "}
          {new Date(project.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </Space>
    </StyledProjectCard>
  );
};
