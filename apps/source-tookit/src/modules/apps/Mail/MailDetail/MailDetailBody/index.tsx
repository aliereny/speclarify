import React from 'react';
import {
  StyledMailDetailBody,
  StyledMailDetailBodyContent,
} from '../index.styled';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedMail } from '../../../../../toolkit/actions';
import { MessageItem } from '@crema/modules/apps/Mail';
import type { MailObjType, MessageType } from '@crema/models/apps/Mail';

type MailDetailBodyProps = {
  selectedMail: MailObjType;
};

function addObjectInMiddle(
  array: MessageType[],
  index: number,
  object: MessageType
) {
  const newArray = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    newArray[i] = array[i];
  }
  newArray[index] = object;
  return newArray;
}

const MailDetailBody: React.FC<MailDetailBodyProps> = ({ selectedMail }) => {
  const dispatch = useAppDispatch();
  const onSubmitMail = (message: MessageType, index: number) => {
    const messages = selectedMail.messages;
    if (messages)
      dispatch(
        onUpdateSelectedMail({
          ...selectedMail,
          messages: addObjectInMiddle(messages, index + 1, message),
        })
      );
  };

  const onChangeStarred = (message: MessageType, isStarred: boolean) => {
    const messages = selectedMail.messages!.map((data) =>
      data.messageId === message.messageId ? { ...message, isStarred } : data
    );
    dispatch(onUpdateSelectedMail({ ...selectedMail, messages }));
  };

  return (
    <StyledMailDetailBody>
      {selectedMail ? (
        <StyledMailDetailBodyContent>
          {selectedMail!.messages!.map((message, index) => (
            <MessageItem
              key={index}
              index={index}
              mailLength={selectedMail!.messages!.length}
              message={message}
              onSubmitMail={onSubmitMail}
              onChangeStarred={onChangeStarred}
            />
          ))}
        </StyledMailDetailBodyContent>
      ) : null}
    </StyledMailDetailBody>
  );
};

export default MailDetailBody;
