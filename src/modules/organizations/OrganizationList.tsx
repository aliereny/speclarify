'use client';
import AppGrid from '@crema/components/AppGrid';
import { Button, Empty } from 'antd';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import {
  fetchOrganizationsRequest,
  Organization,
} from '@/redux/slices/organizationSlice';
import {
  StyledEmpty,
  StyledTypographyWrapper,
} from '@/modules/organizations/Organization.styled';
import { OrganizationItem } from '@/modules/organizations/OrganizationItem';
import AppsPagination from '@crema/components/AppsPagination';

export const OrganizationList = () => {
  const router = useRouter();
  const { messages } = useIntl();

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
    <StyledTypographyWrapper>
      <div>
        <Button
          type='primary'
          style={{ display: 'block', marginLeft: 'auto', marginBottom: 12 }}
          onClick={() => router.push('/organizations/new')}
        >
          Create Organization
        </Button>
      </div>
      <AppGrid
        responsive={{
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
        }}
        loading={loading}
        data={organizations.items}
        renderItem={(organization: Organization) => (
          <OrganizationItem organization={organization} />
        )}
      />
      {organizations.totalItems === 0 && <StyledEmpty />}
      <AppsPagination
        count={organizations.totalItems}
        page={organizations.currentPage}
        pageSize={organizations.pageSize}
        onChange={handlePage}
      />
    </StyledTypographyWrapper>
  );
};
