import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import {
  StyledMessageScreen,
  StyledMsgAppsFooter,
  StyledMsgScreenScrollbar,
  StyledNoMsg,
  StyledScrollChatNoMain,
} from '../index.styled';
import {
  getConnectionMessages,
  onClearChatHistory,
  onDeleteConversation,
  onDeleteMessage,
  onEditMessage,
  onSendMessage,
} from '../../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import AppsHeader from '@crema/components/AppsHeader';
import {
  ConnectionObjType,
  MessageDataObjType,
  MessageObjType,
  MessageType,
} from '@crema/models/apps/Chat';
import { AddNewMessage, Header, MessagesList } from '@crema/modules/apps/Chat';

type MessagesScreenProps = {
  selectedUser: ConnectionObjType;
};

type RefProps = {
  getScrollElement: () => {
    scrollTop: number;
    scrollHeight: number;
  };
};

type ChatProps = {
  userMessages: MessageObjType;
  connectionData: ConnectionObjType[];
};
const MessagesScreen: React.FC<MessagesScreenProps> = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useAppDispatch();

  const [selectedMessage, setSelectedMessage] =
    useState<MessageDataObjType | null>(null);
  const { user } = useAuthUser();

  const _scrollBarRef = useRef<RefProps | null>(null);
  const userMessages = useAppSelector(({ chatApp }) => chatApp.userMessages);

  useEffect(() => {
    dispatch(getConnectionMessages(selectedUser.channelId));
  }, [dispatch, selectedUser]);

  useEffect(() => {
    if (
      userMessages &&
      userMessages.messageData &&
      userMessages.messageData.length > 0
    ) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [userMessages, _scrollBarRef]);

  const sendFileMessage = (fileMessage: MessageDataObjType) => {
    const data = {
      ...fileMessage,
      sender: user.id,
      time: dayjs().format('llll'),
    };
    dispatch(onSendMessage(selectedUser.channelId, data));
  };

  const onSend = (message: string) => {
    const data = {
      ...selectedMessage,
      message,
      message_type: MessageType.TEXT,
      sender: user.id,
      time: dayjs().format('llll'),
    };

    if (isEdit) {
      data.edited = true;
      dispatch(onEditMessage(selectedUser.channelId, data));
      setMessage('');
      setIsEdit(false);
      setSelectedMessage(null);
    } else {
      console.log('data', data, selectedUser);
      dispatch(onSendMessage(selectedUser.channelId, data));
      setMessage('');
    }
  };

  const onChangeStarred = (checked: boolean) => {
    setIsChecked(checked);
  };

  const onClickEditMessage = (data: MessageDataObjType) => {
    if (data.message_type === MessageType.TEXT) {
      setIsEdit(true);
      setMessage(data.message!);
      setSelectedMessage(data);
    }
  };

  const deleteMessage = (messageId: number) => {
    dispatch(onDeleteMessage(selectedUser.channelId, messageId));
  };

  const deleteConversation = () => {
    dispatch(onDeleteConversation(selectedUser.channelId));
  };

  const clearChatHistory = () => {
    dispatch(onClearChatHistory(selectedUser.channelId));
  };

  return (
    <StyledMessageScreen>
      <AppsHeader>
        <Header
          isChecked={isChecked}
          onChangeStarred={onChangeStarred}
          selectedUser={selectedUser as ConnectionObjType}
          deleteConversation={deleteConversation}
          clearChatHistory={clearChatHistory}
        />
      </AppsHeader>

      {userMessages && user ? (
        <StyledMsgScreenScrollbar ref={_scrollBarRef as any}>
          <MessagesList
            userMessages={userMessages}
            authUser={user}
            selectedUser={selectedUser as ConnectionObjType}
            onClickEditMessage={onClickEditMessage}
            deleteMessage={deleteMessage}
          />
        </StyledMsgScreenScrollbar>
      ) : (
        <StyledScrollChatNoMain>
          <StyledNoMsg>
            <IntlMessages id="chatApp.sayHi" /> {selectedUser?.name}
          </StyledNoMsg>
        </StyledScrollChatNoMain>
      )}

      <StyledMsgAppsFooter>
        <AddNewMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
        />
      </StyledMsgAppsFooter>
    </StyledMessageScreen>
  );
};

export default MessagesScreen;
