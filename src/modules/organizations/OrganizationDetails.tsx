'use client';
import React, { useEffect } from 'react';
import { Col } from 'antd';
import AppLoader from '@crema/components/AppLoader';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import { useParams } from 'next/navigation';
import { fetchOrganizationRequest } from '@/redux/slices/organizationSlice';
import StatsDirCard from '@/modules/dashboards/CommonComponents/StatsDirCard';
import { OrganizationItem } from '@/modules/organizations/OrganizationItem';
import Link from 'next/link';
import { fetchProjectsRequest } from '@/redux/slices/projectSlice';
import { fetchOrganizationMembersRequest } from '@/redux/slices/organizationMemberSlice';

export const OrganizationDetails = () => {
  const { currentOrganization, loading } = useAppSelector(state => state.organizations);
  const { projects } = useAppSelector(state => state.projects);
  const { organizationMembers } = useAppSelector(state => state.organizationMembers);

  const orgPath = useParams().orgPath as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrganizationRequest(orgPath));
    dispatch(fetchProjectsRequest({
      orgPath,
      pageNumber: 1,
      pageSize: 10,
    }));
    dispatch(fetchOrganizationMembersRequest({
      orgPath,
      pageNumber: 1,
      pageSize: 10,
    }));
  }, [dispatch]);

  return (
    <>
      {!loading && currentOrganization ? (
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppRowContainer delay={150}>
            <Col key={'members'} xs={24}>
              <OrganizationItem organization={currentOrganization} hideNavigation />
            </Col>
            <Col key={'members'} xs={24} sm={12} lg={12}>
              <Link href={`/organizations/${orgPath}/members`}>
                <StatsDirCard
                  data={{
                    id: 1,
                    name: 'Members',
                    iconImg: 'dashboard/user.svg',
                    color: '#0A8FDC',
                    value: organizationMembers.totalItems.toString() || '0',
                    percentageChange: 100,
                    duration: '',
                  }} />
              </Link>
            </Col>
            <Col key={'projects'} xs={24} sm={12} lg={12}>
              <Link href={`/organizations/${orgPath}/projects`}>
                <StatsDirCard data={{
                  id: 2,
                  name: 'Projects',
                  iconImg: 'dashboard/deals_hand.svg',
                  color: '#F04F47',
                  value: projects.totalItems.toString() || '0',
                  percentageChange: 100,
                  duration: '',
                }} />
              </Link>
            </Col>
          </AppRowContainer>
        </AppAnimate>
      ) : (
        <AppLoader />
      )}
    </>
  );
};

