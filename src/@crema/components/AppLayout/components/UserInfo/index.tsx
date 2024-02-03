import React from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import {
  StyledCrUserDesignation,
  StyledCrUserInfo,
  StyledCrUserInfoAvatar,
  StyledCrUserInfoContent,
  StyledCrUserInfoInner,
  StyledUserArrow,
  StyledUsername,
  StyledUsernameInfo,
} from './index.styled';
import { useAppDispatch, useAppSelector } from '@/redux/appStore';
import { signOutRequest, User } from '@/redux/slices/userSlice';

type UserInfoProps = {
  hasColor?: boolean;
};
const UserInfo: React.FC<UserInfoProps> = ({ hasColor }) => {
  const { themeMode } = useThemeContext();
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(state => state.user.currentUser) as User;
  const router = useRouter();
  const { sidebarColorSet } = useSidebarContext();
  const { allowSidebarBgImage } = useSidebarContext();

  const getUserAvatar = () => {
    if (currentUser.name) {
      return currentUser.name.charAt(0).toUpperCase();
    }
    if (currentUser.email) {
      return currentUser.email.charAt(0).toUpperCase();
    }
  };

  const items = [
    {
      key: 1,
      label: <div onClick={() => router.push('/my-profile')}>My Profile</div>,
    },
    {
      key: 2,
      label: <div onClick={() => {
        dispatch(signOutRequest())
      }}>Logout</div>,
    },
  ];

  return (
    <>
      {hasColor ? (
        <StyledCrUserInfo
          style={{
            backgroundColor: allowSidebarBgImage
              ? ''
              : sidebarColorSet.sidebarHeaderColor,
            color: sidebarColorSet.sidebarTextColor,
          }}
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}
        >
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className="ant-dropdown-link">
              {currentUser.photo ? (
                <StyledCrUserInfoAvatar src={currentUser.photo} />
              ) : (
                <StyledCrUserInfoAvatar>
                  {getUserAvatar()}
                </StyledCrUserInfoAvatar>
              )}
              <StyledCrUserInfoContent className="cr-user-info-content">
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx('text-truncate', {
                      light: themeMode === 'light',
                    })}
                  >
                    {currentUser.name ? currentUser.name : 'admin user '}
                  </StyledUsername>
                  <StyledUserArrow className="cr-user-arrow">
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className="text-truncate">
                  System Manager
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      ) : (
        <StyledCrUserInfo
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}
        >
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className="ant-dropdown-link">
              {currentUser.photo ? (
                <StyledCrUserInfoAvatar src={currentUser.photo} />
              ) : (
                <StyledCrUserInfoAvatar>
                  {getUserAvatar()}
                </StyledCrUserInfoAvatar>
              )}
              <StyledCrUserInfoContent className="cr-user-info-content">
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx('text-truncate', {
                      light: themeMode === 'light',
                    })}
                  >
                    {currentUser.name ? currentUser.name : 'admin user '}
                  </StyledUsername>
                  <StyledUserArrow className="cr-user-arrow">
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className="text-truncate cr-user-designation">
                  System Manager
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      )}
    </>
  );
};

export default UserInfo;
