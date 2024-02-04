import React from 'react';
import { Dropdown } from 'antd';
import { green, red } from '@ant-design/colors';
import { DownOutlined } from '@ant-design/icons';
import { BiCheck } from 'react-icons/bi';

import {
  StyledChatUserAvatar,
  StyledChatUserAvatarView,
  StyledChatUserInfo,
  StyledChatUserInfoContext,
  StyledChatUserName,
  StyledChatUserStatus,
  StyledChatUserStatusDot,
  StyledChatUserStatusText,
  StyledDropDownItem,
} from './userInfo.styled';
import IntlMessages from '@crema/helpers/IntlMessages';
import { User } from '@/redux/slices/userSlice';

type UserInfoProps = {
  user: User;
  showStatus?: boolean;
  showStatusActive?: boolean;
};

const randBool = () => {
  return new Date().getSeconds() % 2 === 0;
};

const UserInfo: React.FC<UserInfoProps> = ({
                                             user,
                                             showStatus = false,
                                             showStatusActive,
                                           }) => {
  const getUserAvatar = () => {
    const name = user.name;
    return name.charAt(0).toUpperCase();
  };

  if (!user) {
    return null;
  }

  const items = [
    {
      key: 1,
      label: (
        <StyledDropDownItem className="active">
          <BiCheck className="icon" /> Active
        </StyledDropDownItem>
      ),
    },
    {
      key: 2,
      label: (
        <StyledDropDownItem>
          <BiCheck className="icon" /> Away
        </StyledDropDownItem>
      ),
    },
    {
      key: 3,
      label: (
        <StyledDropDownItem>
          <BiCheck className="icon" /> Do not distrub
        </StyledDropDownItem>
      ),
    },
    {
      key: 4,
      label: (
        <StyledDropDownItem>
          <BiCheck className="icon" />
          Invisible
        </StyledDropDownItem>
      ),
    },
  ];

  return (
    <StyledChatUserInfo>
      <StyledChatUserAvatarView>
        {user.photo || user.photo ? (
          <StyledChatUserAvatar src={user.photo || user.photo} />
        ) : (
          <StyledChatUserAvatar>{getUserAvatar()}</StyledChatUserAvatar>
        )}
        {randBool()
          ? null
          : showStatus && (
          <StyledChatUserStatusDot
            className="chat-user-status-dot chat-user-status-dot-only"
            style={{
              backgroundColor: randBool() ? green[6] : red[6],
            }}
          />
        )}
        {showStatusActive && (
          <StyledChatUserStatus>
            <StyledChatUserStatusDot
              className="chat-user-status-dot"
              style={{
                backgroundColor: randBool() ? green[6] : red[6],
              }}
            />
            <Dropdown menu={{ items }} trigger={['click']}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                <DownOutlined />
              </a>
            </Dropdown>
          </StyledChatUserStatus>
        )}
      </StyledChatUserAvatarView>
      <StyledChatUserInfoContext>
        <StyledChatUserName className="text-truncate">
          {user.name || user.name
            ? user.name || user.name
            : user.email}
        </StyledChatUserName>
        {randBool() ? (
          <StyledChatUserStatusText className="pointer">
            {Math.random() * 10} <IntlMessages id="chatApp.participants" />
          </StyledChatUserStatusText>
        ) : (
          <StyledChatUserStatusText className="text-truncate">
            {randBool() ? 'Custom status' : 'Online'}
          </StyledChatUserStatusText>
        )}
      </StyledChatUserInfoContext>
    </StyledChatUserInfo>
  );
};

export default UserInfo;
