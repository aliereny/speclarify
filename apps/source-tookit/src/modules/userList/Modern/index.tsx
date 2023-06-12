import React, { useEffect } from 'react';
import { ListItem } from '@crema/modules/userList/Modern';
import AppList from '@crema/components/AppList';
import AppInfoView from '@crema/components/AppInfoView';
import { StyledUserModern } from './index.styled';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { onGetUserList } from '../../../toolkit/actions';

const Modern = () => {
  const dispatch = useAppDispatch();

  const usersList = useAppSelector(({ userList }) => userList.usersList);

  useEffect(() => {
    dispatch(onGetUserList());
  }, [dispatch]);

  return (
    <StyledUserModern>
      {usersList ? (
        <AppList
          interval={120}
          type="top"
          data={usersList}
          renderItem={(user) => {
            return <ListItem user={user} key={user.id} />;
          }}
        />
      ) : null}
      <AppInfoView />
    </StyledUserModern>
  );
};

export default Modern;
