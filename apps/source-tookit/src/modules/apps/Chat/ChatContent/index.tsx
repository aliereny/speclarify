import React from 'react';
import { StyledChatContentScreen, StyledChatNoScreen } from './index.styled';
import { NoUserScreen } from '@crema/modules/apps/Chat';
import MessagesScreen from './ChatViewContainer';
import { ConnectionObjType } from '@crema/models/apps/Chat';

type ChatContentProps = {
  selectedUser: ConnectionObjType | null;
};

const ChatContent: React.FC<ChatContentProps> = ({ selectedUser }) => {
  return (
    <>
      {selectedUser ? (
        <StyledChatContentScreen>
          <MessagesScreen selectedUser={selectedUser} />
        </StyledChatContentScreen>
      ) : (
        <StyledChatNoScreen>
          <NoUserScreen />
        </StyledChatNoScreen>
      )}
    </>
  );
};
export default ChatContent;
