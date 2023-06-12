import React from 'react';
import { Avatar } from 'antd';
import AppMenu from '@crema/components/AppMenu';
import {
  StyledRecentPatientBadge,
  StyledRecentPatientTable,
  StyledRecentPatientUserInfo,
  StyledRecentPatientUserInfoContent,
} from '../index.styled';
import type { RecentPatientDataType } from '@crema/models/dashboards/HealthCare';
import { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<RecentPatientDataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => (
      <StyledRecentPatientUserInfo>
        <Avatar src={record.profile_pic} />
        <StyledRecentPatientUserInfoContent>
          <h3>{name}</h3>
        </StyledRecentPatientUserInfoContent>
      </StyledRecentPatientUserInfo>
    ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
  {
    title: 'Assigned Dr',
    dataIndex: 'assignedDr',
    key: 'assignedDr',
  },
  {
    title: 'Admit Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status, record) => (
      <StyledRecentPatientBadge
        style={{
          color: record.color,
          backgroundColor: record.color + '44',
        }}
      >
        {record.name}
      </StyledRecentPatientBadge>
    ),
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    key: 'actions',
    render: () => <AppMenu />,
  },
];

type RecentPatientsProps = {
  recentPatients: RecentPatientDataType[];
};

const PatientsTable: React.FC<RecentPatientsProps> = ({ recentPatients }) => {
  return (
    <StyledRecentPatientTable
      hoverColor
      data={recentPatients}
      columns={columns}
      pagination={false}
    />
  );
};

export default PatientsTable;
