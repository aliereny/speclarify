'use client';
import AppGrid from '@crema/components/AppGrid';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import { fetchProjectsRequest, Project } from '@/redux/slices/projectSlice';
import { StyledTypographyWrapper } from '@/modules/projects/Project.styled';
import { ProjectItem } from '@/modules/projects/ProjectItem';
import AppsPagination from '@crema/components/AppsPagination';
import { StyledEmpty } from '@/modules/organizations/Organization.styled';

export const ProjectList = () => {
  const router = useRouter();
  const { messages } = useIntl();

  const { projects, loading } = useAppSelector((state) => state.projects);

  const orgPath = useParams().orgPath as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchProjectsRequest({
        orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, []);

  const handlePage = (pageNumber: number) => {
    dispatch(
      fetchProjectsRequest({
        orgPath,
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
          onClick={() => router.push(`/organizations/${orgPath}/projects/new`)}
        >
          Create Project
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
        data={projects.items}
        renderItem={(project: Project) => <ProjectItem project={project} />}
      />
      {projects.totalItems === 0 && <StyledEmpty />}
      <AppsPagination
        count={projects.totalItems}
        page={projects.currentPage}
        pageSize={projects.pageSize}
        onChange={handlePage}
      />
    </StyledTypographyWrapper>
  );
};
