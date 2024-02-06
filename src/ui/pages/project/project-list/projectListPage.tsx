"use client";

import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useEffect } from "react";
import { fetchProjectsRequest } from "@/redux/slices/projectSlice";
import {
  Button,
  Col,
  Empty,
  Flex,
  Pagination,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { ProjectCard } from "@/ui/molecules/project-card/projectCard";

export const ProjectListPage = () => {
  const router = useRouter();

  const { projects, loading } = useAppSelector((state) => state.projects);

  const orgPath = useParams().orgPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchProjectsRequest({
        orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, []);

  const handlePage = (pageNumber: number) => {
    dispatch(
      fetchProjectsRequest({
        orgPath,
        pageNumber,
        pageSize: 10,
      }),
    );
  };

  return (
    <Flex vertical gap={16}>
      <Flex justify={"space-between"}>
        <Typography.Title level={3}>Projects</Typography.Title>
        <Button
          type="primary"
          onClick={() => router.push(`/organizations/${orgPath}/projects/new`)}
        >
          Create Project
        </Button>
      </Flex>
      {loading && <Skeleton active />}
      {!loading && (
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {projects.items.map((project) => (
            <Col key={project.id} xs={24} sm={12} md={8} lg={6}>
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
      )}
      {!loading && projects.items.length === 0 && (
        <Empty description={"No projects found"} />
      )}
      <Pagination
        pageSize={projects.pageSize}
        current={projects.currentPage}
        total={projects.totalItems}
        onChange={handlePage}
      />
    </Flex>
  );
};
