import React, { useEffect } from 'react';
import PostItem from './PostItem';
import { StyledPostList } from './index.styled';
import { PostObjType, WallDataType } from '@crema/models/apps/Wall';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onGetPostsList } from '../../../../toolkit/actions';

type PostListsProps = {
  wallData: WallDataType;
};
const PostsList: React.FC<PostListsProps> = ({ wallData }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetPostsList());
  }, [dispatch]);

  const postList = useAppSelector(({ wall }) => wall.postList);

  return (
    <StyledPostList
      data={postList}
      renderItem={(post: PostObjType, index: number) => (
        <PostItem
          key={index}
          post={post}
          wallData={wallData}
          isLast={postList.length - 1 === index}
        />
      )}
    />
  );
};

export default PostsList;
