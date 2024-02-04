'use organization';
import React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import { useRouter } from 'next/navigation';
import AppCard from '@crema/components/AppCard';
import { Button, Dropdown, MenuProps, Typography } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { StyledAvatar, StyledSecondaryText } from './Organization.styled';
import { deleteOrganizationRequest, Organization } from '@/redux/slices/organizationSlice';
import { useAppDispatch } from '@/redux/appStore';

type Props = {
  organization: Organization;
};

export const OrganizationItem = ({ organization }: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const menuItems: MenuProps['items'] = [
    {
      key: 312,
      label: 'Edit organization',
      onClick: () => router.push(`/organizations/${organization.path}/edit`),
    }, {
      key: 313,
      label: 'Delete organization',
      onClick: () => dispatch(deleteOrganizationRequest(organization.path)),

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
      {organization.photo ? (
        <StyledAvatar src={organization.photo} size={60} shape="square" />
      ) : (
        <StyledAvatar size={60} shape="square">
          {organization.name[0].toUpperCase()}
        </StyledAvatar>
      )}

      <Typography.Title
        level={4}
        style={{ marginTop: 16, marginBottom: 16, textAlign: 'center' }}
      >
        {organization.name}
      </Typography.Title>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <AiOutlineMail size={20} />
        <StyledSecondaryText>{organization.email}</StyledSecondaryText>
      </div>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <GoLocation size={20} />
        <StyledSecondaryText>
          {organization.address}
        </StyledSecondaryText>
      </div>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <FiPhone size={20} />
        <StyledSecondaryText>
          {organization.phoneNumber}
        </StyledSecondaryText>
      </div>
      <div style={{ display: 'flex', marginBottom: 16 }}>
        <BsLink45Deg size={20} />
        <StyledSecondaryText>
          <Typography.Link href={organization.website}>{organization.website}</Typography.Link>
        </StyledSecondaryText>
      </div>
    </AppCard>
  );
};
