import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import { ChatSideBar } from '@crema/modules/apps/Chat';
import ChatContent from './ChatContent';
import { getConnectionList, onSelectUser } from '../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { ConnectionObjType } from '@crema/models/apps/Chat';

const Chat = () => {
  const selectedUser = useAppSelector(({ chatApp }) => chatApp.selectedUser);

  const dispatch = useAppDispatch();
  const connectionList = useAppSelector(
    ({ chatApp }) => chatApp.connectionList
  );

  const { loading } = useAppSelector(({ common }) => common);

  useEffect(() => {
    dispatch(getConnectionList());
  }, [dispatch]);

  const setSelectedUser = (item: ConnectionObjType) => {
    dispatch(onSelectUser(item));
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages['chatApp.chat'] as string}
      sidebarContent={
        <ChatSideBar
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          connectionList={connectionList}
          loading={loading}
        />
      }
    >
      <AppPageMeta title="Chat App" />
      <ChatContent selectedUser={selectedUser} />
    </AppsContainer>
  );
};

export default Chat;
