'use client';

import { Avatar, Button, Popconfirm, Select } from 'antd';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import {
  deleteOrganizationMemberRequest,
  fetchOrganizationMembersRequest,
  OrganizationMember,
  OrganizationRole,
  updateOrganizationMemberRequest,
} from '@/redux/slices/organizationMemberSlice';
import {
  StyledOrganizationMemberTable,
  StyledOrganizationMemberWrapper,
} from '@/modules/organizationMember/OrganizationMember.styled';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export const OrganizationMemberList = () => {
  const { organizationMembers } = useAppSelector(
    (state) => state.organizationMembers,
  );

  const orgPath = useParams().orgPath as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchOrganizationMembersRequest({
        orgPath,
        pageNumber: 1,
        pageSize: 10,
      }),
    );
  }, []);

  const handleSelect = (
    value: OrganizationRole,
    option: OrganizationMember,
  ) => {
    dispatch(
      updateOrganizationMemberRequest({
        orgPath,
        memberId: option.id,
        role: value,
      }),
    );
  };

  const handleRemove = (record: OrganizationMember) => {
    dispatch(deleteOrganizationMemberRequest({ orgPath, memberId: record.id }));
  };

  return (
    <StyledOrganizationMemberWrapper>
      <Link href={`/organizations/${orgPath}/members/new`}>
        <Button type='primary'>Add Member</Button>
      </Link>
      <StyledOrganizationMemberTable
        rowKey={(record) => record.id}
        dataSource={organizationMembers.items}
        scroll={{ x: 914 }}
        columns={
          [
            {
              title: '',
              dataIndex: ['user', 'photo'],
              key: 'avatar',
              render: (text: string, record: OrganizationMember) => (
                <Avatar src={text}>
                  {text
                    ? undefined
                    : record.user.name
                        .split(' ')
                        .map((i) => i.slice(0, 1))
                        .join('')
                        .toUpperCase()}
                </Avatar>
              ),
              fixed: 'left',
              width: 64,
            },
            {
              title: 'Name',
              dataIndex: ['user', 'name'],
              key: 'name',
              width: 150,
            },
            {
              title: 'Email',
              dataIndex: ['user', 'email'],
              key: 'email',
              width: 250,
            },
            {
              title: 'Role',
              dataIndex: 'role',
              key: 'role',
              render: (text: OrganizationRole, record: OrganizationMember) =>
                text === OrganizationRole.Owner ? (
                  text.slice(0, 1).toUpperCase() + text.slice(1)
                ) : (
                  <Select
                    value={text}
                    style={{ width: 118 }}
                    onSelect={(val) => handleSelect(val, record)}
                  >
                    <Select.Option value={OrganizationRole.Admin}>
                      Admin
                    </Select.Option>
                    <Select.Option value={OrganizationRole.Editor}>
                      Editor
                    </Select.Option>
                    <Select.Option value={OrganizationRole.Viewer}>
                      Viewer
                    </Select.Option>
                  </Select>
                ),
              width: 150,
            },
            {
              title: 'Joined At',
              dataIndex: 'joinedAt',
              key: 'joinedAt',
              render: (text: string) =>
                new Date(text).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
              width: 200,
            },
            {
              title: 'Remove',
              key: 'remove',
              render: (_: any, record: OrganizationMember) => (
                <Popconfirm
                  title={'Are you sure?'}
                  onConfirm={() => handleRemove(record)}
                >
                  <Button type='link' danger>
                    Remove
                  </Button>
                </Popconfirm>
              ),
              width: 100,
            },
          ] as any
        }
      />
    </StyledOrganizationMemberWrapper>
  );
};
