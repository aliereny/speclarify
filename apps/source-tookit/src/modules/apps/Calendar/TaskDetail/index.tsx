import React, { useEffect } from 'react';
import TaskDetailHeader from './TaskDetailHeader';
import TaskDetailBody from './TaskDetailBody';
import { useRouter } from 'next/router';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import { MailDetailSkeleton } from '@crema/components/MailDetailSkeleton';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { onGetSelectedCalTask } from '../../../../toolkit/actions';

const TaskDetail = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(onGetSelectedCalTask(Number(query?.all?.[query.all.length - 1])));
  }, [dispatch, query.all]);

  const selectedTask = useAppSelector(
    ({ calendarApp }) => calendarApp.selectedTask
  );

  if (!selectedTask) {
    return <MailDetailSkeleton />;
  }
  return (
    <>
      <AppsHeader>
        <TaskDetailHeader selectedTask={selectedTask} />
      </AppsHeader>
      <AppsContent isDetailView>
        <TaskDetailBody selectedTask={selectedTask} />
      </AppsContent>
    </>
  );
};

export default TaskDetail;
