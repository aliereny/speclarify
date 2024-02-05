'use project';
import React from 'react';
import { AiOutlineFileText, AiOutlineMail } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { useParams, useRouter } from 'next/navigation';
import AppCard from '@crema/components/AppCard';
import { Button, Dropdown, MenuProps, Typography } from 'antd';
import { CalendarOutlined, MoreOutlined } from '@ant-design/icons';
import { StyledAvatar, StyledSecondaryText } from './Project.styled';
import { deleteProjectRequest, Project } from '@/redux/slices/projectSlice';
import { useAppDispatch } from '@/redux/appStore';

type Props = {
  project: Project;
};

export const ProjectItem = ({ project }: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const orgPath = useParams().orgPath as string;

  const menuItems: MenuProps['items'] = [
    {
      key: 312,
      label: 'Edit project',
      onClick: () => router.push(`/organizations/${orgPath}/projects/${project.path}/edit`),
    }, {
      key: 313,
      label: 'Delete project',
      onClick: () => dispatch(deleteProjectRequest({
        orgPath,
        projectPath: project.path,
      })),

    },
  ];
  return (
    <AppCard
      extra={
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Button type="text">
            <MoreOutlined />
          </Button>
        </Dropdown>
      }
    >
      {project.photo ? (
        <StyledAvatar src={project.photo} size={60} shape="square" />
      ) : (
        <StyledAvatar size={60} shape="square">
          {project.name[0].toUpperCase()}
        </StyledAvatar>
      )}

      <Typography.Title
        level={4}
        style={{ marginTop: 16, marginBottom: 16, textAlign: 'center' }}
      >
        {project.name}
      </Typography.Title>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <AiOutlineFileText size={20} />
        <StyledSecondaryText>{project.description}</StyledSecondaryText>
      </div>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <CalendarOutlined size={20} />
        <StyledSecondaryText>
          Created on{' '}
          {new Date(project.createdAt).toLocaleDateString(
            'en-US',
            {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            },
          )}
        </StyledSecondaryText>
      </div>
      <Button type="primary" onClick={() => router.push(`/organizations/${orgPath}/projects/${project.path}`)}>
        Go to project
      </Button>
    </AppCard>
  );
};
