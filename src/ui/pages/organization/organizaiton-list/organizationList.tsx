"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useEffect } from "react";
import { fetchOrganizationsRequest } from "@/redux/slices/organizationSlice";
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
import { OrganizationCard } from "@/ui/molecules/organization-card/organizationCard";

export const OrganizationList = () => {
  const router = useRouter();

  const { organizations, loading } = useAppSelector(
    (state) => state.organizations,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchOrganizationsRequest({
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, []);

  const handlePage = (pageNumber: number) => {
    dispatch(
      fetchOrganizationsRequest({
        pageNumber,
        pageSize: 10,
      }),
    );
  };

  return (
    <Flex vertical gap={16}>
      <Flex justify={"space-between"}>
        <Typography.Title level={3}>Organizations</Typography.Title>
        <Button
          type="primary"
          onClick={() => router.push("/organizations/new")}
        >
          Create Organization
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
          {organizations.items.map((organization) => (
            <Col key={organization.id} xs={24} sm={12} md={8} lg={6}>
              <OrganizationCard organization={organization} />
            </Col>
          ))}
        </Row>
      )}
      {!loading && organizations.items.length === 0 && (
        <Empty description={"No organizations found"} />
      )}
      <Pagination
        pageSize={organizations.pageSize}
        current={organizations.currentPage}
        total={organizations.totalItems}
        onChange={handlePage}
      />
    </Flex>
  );
};
