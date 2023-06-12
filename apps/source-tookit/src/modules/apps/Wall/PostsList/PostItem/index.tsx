import React from 'react';
import Attachments from './Attachments';
import PostStats from './PostStats';
import AddComment from './AddComment';
import { CommentsList } from '@crema/modules/apps/Wall';
import { EllipsisOutlined } from '@ant-design/icons';
import { getTimeFromNow } from '@crema/helpers';
import {
  StyledPostItemAvatar,
  StyledPostItemCard,
  StyledPostItemExtraBtn,
  StyledPostItemPara,
  StyledPostItemUser,
  StyledPostItemUserInfo,
} from '../index.styled';
import { PostObjType, WallDataType } from '@crema/models/apps/Wall';

type PostItemProps = {
  post: PostObjType;
  wallData: WallDataType;
  isLast: boolean;
};
const PostItem: React.FC<PostItemProps> = ({ post, wallData, isLast }) => {
  const { owner, message, date, attachments, comments } = post;
  const getTitle = () => (
    <StyledPostItemUser>
      <StyledPostItemAvatar src={owner.profilePic} />
      <StyledPostItemUserInfo>
        <h3>{owner.name}</h3>
        <p>{getTimeFromNow(date)}</p>
      </StyledPostItemUserInfo>
    </StyledPostItemUser>
  );

  return (
    <StyledPostItemCard
      title={getTitle()}
      className={isLast ? '' : 'mb-5'}
      extra={
        <StyledPostItemExtraBtn>
          <EllipsisOutlined />
        </StyledPostItemExtraBtn>
      }
    >
      {message ? <StyledPostItemPara>{message}</StyledPostItemPara> : null}
      <Attachments attachments={attachments} />
      <PostStats post={post} />
      <AddComment postId={post.id} wallData={wallData} />
      {comments.length > 0 && <CommentsList comments={comments} />}
    </StyledPostItemCard>
  );
};

export default PostItem;
