'use client';
import React from 'react';
import { createProjectRequest, CreateProjectRequestPayload } from '@/redux/slices/projectSlice';
import { useAppDispatch } from '@/redux/appStore';
import { ProjectForm } from '@/modules/projects/ProjectForm';
import { StyledTypographyWrapper } from '@/modules/invoice/index.styled';
import { useParams } from 'next/navigation';

export const AddProject = () => {
  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;

  const onSave = (data: CreateProjectRequestPayload) => {
    dispatch(createProjectRequest({
      ...data,
      orgPath,
    }));
  };

  return (
    <StyledTypographyWrapper>
      <ProjectForm onSave={onSave} />
    </StyledTypographyWrapper>
  );
};

