import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/appStore";
import { useEffect } from "react";
import { fetchOrganizationsRequest } from "@/redux/slices/organizationSlice";
import { Button, Empty, Pagination, Skeleton } from "antd";

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
    <div>
      <Button type="primary" onClick={() => router.push("/organizations/new")}>
        Create Organization
      </Button>
      {loading && <Skeleton active />}
      {!loading &&
        organizations.items.map((organization) => (
          <div key={organization.id}>
            <h2>{organization.name}</h2>
            <p>{organization.email}</p>
          </div>
        ))}
      {!loading && organizations.items.length === 0 && (
        <Empty description={"No organizations found"} />
      )}
      <Pagination
        pageSize={organizations.pageSize}
        current={organizations.currentPage}
        total={organizations.totalItems}
        onChange={handlePage}
      />
    </div>
  );
};
