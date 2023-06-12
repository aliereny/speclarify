import React, { useState, useEffect } from 'react';
import TaskSideBar from './TaskSideBar/index';
import TasksList from './TasksList';
import TaskDetail from './TaskDetail';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import { useRouter } from 'next/router';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useAppDispatch } from '../../../toolkit/hooks';
import {
  onGetToDoFolderList,
  onGetToDoLabelList,
  onGetToDoPriorityList,
  onGetToDoStaffList,
  onGetToDoStatusList,
} from '../../../toolkit/actions';

export type FilterProps = {
  status: number[];
  priority: number[];
};

const ToDo = () => {
  const { query } = useRouter();
  const [filterData, setFilterData] = useState<FilterProps>({
    status: [],
    priority: [],
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetToDoLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoPriorityList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStaffList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetToDoStatusList());
  }, [dispatch]);

  const { messages } = useIntl();

  const onGetMainComponent = () => {
    if (query?.all?.[2]) {
      return <TaskDetail />;
    } else {
      return <TasksList filterData={filterData} />;
    }
  };

  return (
    <AppsContainer
      title={messages['todo.todoApp'] as string}
      sidebarContent={
        <TaskSideBar filterData={filterData} setFilterData={setFilterData} />
      }
    >
      <AppPageMeta title="Calendar App" />
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default ToDo;
