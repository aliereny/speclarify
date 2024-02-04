'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import { useParams } from 'next/navigation';
import {
  CreateOrganizationRequestPayload,
  fetchOrganizationRequest,
  updateOrganizationRequest,
} from '@/redux/slices/organizationSlice';
import AppLoader from '@crema/components/AppLoader';
import { StyledTypographyWrapper } from '@/modules/organizations/Organization.styled';
import { OrganizationForm } from '@/modules/organizations/OrganizationForm';

export const EditOrganization = () => {
  const { loading, currentOrganization } = useAppSelector(state => state.organizations);

  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;

  useEffect(() => {
    dispatch(fetchOrganizationRequest(orgPath));
  }, []);

  const onSave = (data: CreateOrganizationRequestPayload) => {
    dispatch(updateOrganizationRequest({
      ...data,
      path: orgPath,
    }));
  };


  return !loading ? (
    <StyledTypographyWrapper>
      {
        currentOrganization &&
        <OrganizationForm selectedOrganization={currentOrganization} onSave={onSave} />
      }
    </StyledTypographyWrapper>
  ) : <AppLoader />;
};

