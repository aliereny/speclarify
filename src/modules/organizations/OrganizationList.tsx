'use client';
import AppGrid from '@crema/components/AppGrid';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import { fetchOrganizationsRequest, Organization } from '@/redux/slices/organizationSlice';
import { StyledTypographyWrapper } from '@/modules/organizations/Organization.styled';
import { OrganizationItem } from '@/modules/organizations/OrganizationItem';

export const OrganizationList = () => {
  const router = useRouter();
  const { messages } = useIntl();

  const { organizations, loading } = useAppSelector(state => state.organizations);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrganizationsRequest({
      pageNumber: 1,
      pageSize: 10,
    }));
  }, []);

  return (
    <StyledTypographyWrapper>
      <div>
        <Button
          type="primary"
          style={{ display: 'block', marginLeft: 'auto', marginBottom: 12 }}
          onClick={() => router.push('/organizations/new')}
        >
          {messages['organizations.addOrganization'] as string}
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
        renderItem={(organization: Organization) => <OrganizationItem organization={organization} />}
      />
    </StyledTypographyWrapper>
  );
};

