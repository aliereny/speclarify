'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import { useParams } from 'next/navigation';
import {
  CreateProjectRequestPayload,
  fetchProjectRequest,
  updateProjectRequest,
} from '@/redux/slices/projectSlice';
import AppLoader from '@crema/components/AppLoader';
import { StyledTypographyWrapper } from '@/modules/projects/Project.styled';
import { ProjectForm } from '@/modules/projects/ProjectForm';

export const EditProject = () => {
  const { loading, currentProject } = useAppSelector(state => state.projects);

  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;
  const projectPath = useParams().projectPath as string;

  useEffect(() => {
    dispatch(fetchProjectRequest({
      orgPath,
      projectPath,
    }));
  }, []);

  const onSave = (data: CreateProjectRequestPayload) => {
    dispatch(updateProjectRequest({
      ...data,
      orgPath,
      projectPath,
    }));
  };


  return !loading ? (
    <StyledTypographyWrapper>
      {
        currentProject &&
        <ProjectForm selectedProject={currentProject} onSave={onSave} />
      }
    </StyledTypographyWrapper>
  ) : <AppLoader />;
};

