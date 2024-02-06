"use client";
import { OrganizationCard } from "@/ui/molecules/organization-card/organizationCard";
import { Col, Popconfirm, Result, Row, Skeleton } from "antd";
import {
  StyledDeleteFilled,
  StyledEditFilled,
  StyledOrganizationDetailWrapper,
  StyledProjectFilled,
  StyledSmileFilled,
  StyledStatsCard,
  StyledStatsCardBody,
  StyledStatsCardTitle,
  StyledStatsCardValue,
} from "@/ui/pages/organization/organization-detail/organizationDetailPage.styled";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import {
  deleteOrganizationRequest,
  fetchOrganizationRequest,
} from "@/redux/slices/organizationSlice";
import { fetchProjectsRequest } from "@/redux/slices/projectSlice";
import { fetchOrganizationMembersRequest } from "@/redux/slices/organizationMemberSlice";
import Link from "next/link";

export const OrganizationDetailPage = () => {
  const { currentOrganization, loading } = useAppSelector(
    (state) => state.organizations,
  );
  const { projects } = useAppSelector((state) => state.projects);
  const { organizationMembers } = useAppSelector(
    (state) => state.organizationMembers,
  );

  const orgPath = useParams().orgPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrganizationRequest(orgPath));
    dispatch(
      fetchProjectsRequest({
        orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
    dispatch(
      fetchOrganizationMembersRequest({
        orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, [dispatch]);

  return (
    <StyledOrganizationDetailWrapper>
      {loading && <Skeleton active />}
      {!loading &&
        (currentOrganization ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <OrganizationCard organization={currentOrganization} />
            </Col>
            <Col key={"members"} xs={24} sm={12} lg={12}>
              <Link href={`/organizations/${orgPath}/members`}>
                <StyledStatsCard>
                  <StyledSmileFilled />
                  <StyledStatsCardBody>
                    <StyledStatsCardTitle>Members</StyledStatsCardTitle>
                    <StyledStatsCardValue>
                      {organizationMembers.totalItems.toString() || "0"}
                    </StyledStatsCardValue>
                  </StyledStatsCardBody>
                </StyledStatsCard>
              </Link>
            </Col>
            <Col key={"members"} xs={24} sm={12} lg={12}>
              <Link href={`/organizations/${orgPath}/projects`}>
                <StyledStatsCard>
                  <StyledProjectFilled />
                  <StyledStatsCardBody>
                    <StyledStatsCardTitle>Projects</StyledStatsCardTitle>
                    <StyledStatsCardValue>
                      {projects.totalItems.toString() || "0"}
                    </StyledStatsCardValue>
                  </StyledStatsCardBody>
                </StyledStatsCard>
              </Link>
            </Col>
            <Col key={"members"} xs={24} sm={12} lg={12}>
              <Link href={`/organizations/${orgPath}/edit`}>
                <StyledStatsCard>
                  <StyledEditFilled />
                  <StyledStatsCardBody>
                    <StyledStatsCardTitle>
                      Edit Organization
                    </StyledStatsCardTitle>
                  </StyledStatsCardBody>
                </StyledStatsCard>
              </Link>
            </Col>
            <Popconfirm
              title={"Are you sure?"}
              okText={"Yes"}
              cancelText={"No"}
              onConfirm={() => dispatch(deleteOrganizationRequest(orgPath))}
            >
              <Col key={"members"} xs={24} sm={12} lg={12}>
                <StyledStatsCard>
                  <StyledDeleteFilled />
                  <StyledStatsCardBody>
                    <StyledStatsCardTitle>
                      Delete Organization
                    </StyledStatsCardTitle>
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
    </StyledOrganizationDetailWrapper>
  );
};
