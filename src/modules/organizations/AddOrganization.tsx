'use client';
import React from 'react';
import { createOrganizationRequest, CreateOrganizationRequestPayload } from '@/redux/slices/organizationSlice';
import { useAppDispatch } from '@/redux/appStore';
import { OrganizationForm } from '@/modules/organizations/OrganizationForm';
import { StyledTypographyWrapper } from '@/modules/invoice/index.styled';

export const AddOrganization = () => {
  const dispatch = useAppDispatch();

  const onSave = (data: CreateOrganizationRequestPayload) => {
    dispatch(createOrganizationRequest(data));
  };

  return (
    <StyledTypographyWrapper>
      <OrganizationForm onSave={onSave} />
    </StyledTypographyWrapper>
  );
};

