"use client";
import { ProjectCard } from "@/ui/molecules/project-card/projectCard";
import { Col, Popconfirm, Result, Row, Skeleton } from "antd";
import {
  StyledDeleteFilled,
  StyledEditFilled,
  StyledPlayCircleFilled,
  StyledProjectDetailWrapper,
  StyledProjectFilled,
  StyledStatsCard,
  StyledStatsCardBody,
  StyledStatsCardTitle,
  StyledStatsCardValue,
} from "@/ui/pages/project/project-detail/projectDetailPage.styled";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  deleteProjectRequest,
  fetchProjectRequest,
  fetchProjectsRequest,
} from "@/redux/slices/projectSlice";
import Link from "next/link";

export const ProjectDetailPage = () => {
  const { currentProject, loading } = useAppSelector((state) => state.projects);
  const { projects } = useAppSelector((state) => state.projects);

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjectRequest({ orgPath, projectPath }));
    dispatch(
      fetchProjectsRequest({
        orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  return (
    <StyledProjectDetailWrapper>
      {loading && <Skeleton active />}
      {!loading &&
        (currentProject ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <ProjectCard project={currentProject} />
            </Col>
            <Col key={"goto"} span={24}>
              <Link
                href={`/organizations/${orgPath}/projects/${projectPath}/requirements`}
              >
                <StyledStatsCard>
                  <StyledPlayCircleFilled />
                  <StyledStatsCardBody>
                    <StyledStatsCardTitle>
                      Work on this project
                    </StyledStatsCardTitle>
                  </StyledStatsCardBody>
                </StyledStatsCard>
              </Link>
            </Col>
            <Col key={"members"} xs={24} sm={12} lg={12}>
              <Link
                href={`/organizations/${orgPath}/projects/${projectPath}/edit`}
              >
                <StyledStatsCard>
                  <StyledEditFilled />
                  <StyledStatsCardBody>
                    <StyledStatsCardTitle>Edit Project</StyledStatsCardTitle>
                  </StyledStatsCardBody>
                </StyledStatsCard>
              </Link>
            </Col>
            <Popconfirm
              title={"Are you sure?"}
              okText={"Yes"}
              cancelText={"No"}
              onConfirm={() =>
                dispatch(deleteProjectRequest({ projectPath, orgPath }))
              }
            >
              <Col key={"members"} xs={24} sm={12} lg={12}>
                <StyledStatsCard>
                  <StyledDeleteFilled />
                  <StyledStatsCardBody>
                    <StyledStatsCardTitle>Delete Project</StyledStatsCardTitle>
                  </StyledStatsCardBody>
                </StyledStatsCard>
              </Col>
            </Popconfirm>
          </Row>
        ) : (
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
          />
        ))}
    </StyledProjectDetailWrapper>
  );
};
