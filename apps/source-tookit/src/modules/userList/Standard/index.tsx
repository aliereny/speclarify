import React, { useEffect } from 'react';
import { ListItem } from '@crema/modules/userList/Standard';

import AppList from '@crema/components/AppList';
import AppInfoView from '@crema/components/AppInfoView';
import { StyledUserStandard } from './index.styled';
import { useAppSelector, useAppDispatch } from '../../../toolkit/hooks';
import { onGetUserList } from '../../../toolkit/actions';

const Standard = () => {
  const dispatch = useAppDispatch();

  const usersList = useAppSelector(({ userList }) => userList.usersList);

  useEffect(() => {
    dispatch(onGetUserList());
  }, [dispatch]);

  return (
    <StyledUserStandard>
      {usersList ? (
        <AppList
          interval={120}
          data={usersList}
          renderItem={(user) => {
            return <ListItem user={user} key={user.id} />;
          }}
        />
      ) : null}
      <AppInfoView />
    </StyledUserStandard>
  );
};

export default Standard;
