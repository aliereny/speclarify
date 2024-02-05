'use client';
import React from 'react';

import { HiUser } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai';
import AppAnimate from '@crema/components/AppAnimate';
import {
  StyledUserProfileContainer,
  StyledUserProfileTabs,
} from '@/modules/my-profile/MyProfile.styled';
import { PersonalInfo } from '@/modules/my-profile/PersonalInfo';
import { ChangePassword } from '@/modules/my-profile/ChangePassword';

const items = [
  {
    label: (
      <span className='user-profile-icon'>
        <HiUser className='icon' />
        <span>Personal Info</span>
      </span>
    ),
    key: '01',
    children: <PersonalInfo />,
  },
  {
    label: (
      <span className='user-profile-icon'>
        <AiFillLock className='icon' />
        <span>Change Password</span>
      </span>
    ),
    key: '02',
    children: <ChangePassword />,
  },
];

export const UserProfile = () => {
  return (
    <StyledUserProfileContainer>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <StyledUserProfileTabs
          key='1'
          defaultActiveKey='01'
          tabPosition='left'
          items={items}
        />
      </AppAnimate>
    </StyledUserProfileContainer>
  );
};
