import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import AppIconButton from '@crema/components/AppIconButton';
import { MdOutlineAttachFile } from 'react-icons/md';
import {
  StyledAddComment,
  StyledAddCommentInput,
  StyledAddCommentUser,
  StyledAddCommentUserInfo,
  StyledAddSuffixAction,
  StyledPostItemAvatar,
} from '../index.styled';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { onAddNewComment } from '../../../../../toolkit/actions';
import { WallDataType } from '@crema/models/apps/Wall';
import { MessageType } from '@crema/constants';

type AddCommentProps = {
  postId: number;
  wallData: WallDataType | null;
};

const AddComment: React.FC<AddCommentProps> = ({ postId, wallData }) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState('');

  const submitComment = (event: any) => {
    if (event.key === 'Enter') {
      const newComment = {
        author: {
          name: wallData!.name,
          profilePic: wallData!.profilePic,
          id: wallData!.id,
        },
        message_type: MessageType.TEXT,
        comment,
      };
      dispatch(onAddNewComment(postId, newComment));
      setComment('');
    }
  };

  return (
    <StyledAddComment>
      <StyledPostItemAvatar src={wallData!.profilePic} />
      <StyledAddCommentUser>
        <StyledAddCommentUserInfo>
          <StyledAddCommentInput
            placeholder="Write a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyPress={submitComment}
            suffix={
              <StyledAddSuffixAction>
                <AppIconButton icon={<SmileOutlined />} />
                <AppIconButton icon={<MdOutlineAttachFile />} />
              </StyledAddSuffixAction>
            }
          />
        </StyledAddCommentUserInfo>
      </StyledAddCommentUser>
    </StyledAddComment>
  );
};

export default AddComment;
