import React from 'react';
import clsx from 'clsx';
import {
  StyledCommentOutlined,
  StyledLikeOutlined,
  StyledPostStats,
  StyledPostStatsItem,
  StyledPostStatsItemInfo,
  StyledShareAltOutlined,
} from '../index.styled';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdatePostStatus } from '../../../../../toolkit/actions';
import { PostObjType } from '@crema/models/apps/Wall';

type PostStatsProps = {
  post: PostObjType;
};

const PostStats: React.FC<PostStatsProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const toggleLikeStatus = () => {
    dispatch(onUpdatePostStatus(post.id, !post.liked));
  };

  return (
    <StyledPostStats>
      <StyledPostStatsItem
        className={clsx({ active: post.liked })}
        onClick={toggleLikeStatus}
      >
        <StyledLikeOutlined />
        <StyledPostStatsItemInfo>{post.likes} likes</StyledPostStatsItemInfo>
      </StyledPostStatsItem>
      {post.comments.length > 0 && (
        <StyledPostStatsItem>
          <StyledCommentOutlined />
          <StyledPostStatsItemInfo>
            {post.comments.length} Comments
          </StyledPostStatsItemInfo>
        </StyledPostStatsItem>
      )}
      <StyledPostStatsItem>
        <StyledShareAltOutlined />
        <StyledPostStatsItemInfo>{post.shares} Shares</StyledPostStatsItemInfo>
      </StyledPostStatsItem>
    </StyledPostStats>
  );
};

export default PostStats;
