import React, { useEffect, useState } from 'react';
import TaskContentHeader from './TaskContentHeader';
import AddNewTask from '../AddNewTask';
import AppsPagination from '@crema/components/AppsPagination';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import ListEmptyResult from '@crema/components/ListEmptyResult';
import TodoListSkeleton from '@crema/components/TodoListSkeleton';
import AppList from '@crema/components/AppList';
import {
  StyledTodoFooter,
  StyledTodoListDesktop,
  StyledTodoListMobile,
} from './index.styled';
import { TaskListItem, TaskListItemMobile } from '@crema/modules/apps/ToDo';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import {
  onDeleteSelectedTasks,
  onGetTaskList,
  onUpdateTaskStarredStatus,
} from '../../../../toolkit/actions';
import { TodoObjType } from '@crema/models/apps/Todo';
import { useRouter } from 'next/router';

const TasksList = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { all, asPath } = router.query;
  let folder = '';
  let label = '';
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }

  const taskList = useAppSelector(({ todoApp }) => todoApp.taskList);

  const totalTasks = useAppSelector(({ todoApp }) => todoApp.totalTasks);

  const loading = useAppSelector(({ common }) => common.loading);

  const [page, setPage] = useState(0);
  const [filterText, onSetFilterText] = useState<string>('');
  const [checkedTasks, setCheckedTasks] = useState<number[]>([]);
  const [isAddTaskOpen, setAddTaskOpen] = useState<boolean>(false);

  useEffect(() => {
    setPage(0);
  }, [asPath]);

  useEffect(() => {
    if (folder) dispatch(onGetTaskList('folder', folder, page));
    if (label) dispatch(onGetTaskList('label', label, page));
  }, [dispatch, page, folder, label]);

  const onOpenAddTask = () => {
    setAddTaskOpen(true);
  };

  const onCloseAddTask = () => {
    setAddTaskOpen(false);
  };

  const onChangeCheckedTasks = (checked: boolean, id: number) => {
    if (checked) {
      setCheckedTasks(checkedTasks.concat(id));
    } else {
      setCheckedTasks(checkedTasks.filter((taskId) => taskId !== id));
    }
  };

  const onPageChange = (value: number) => {
    setPage(value);
  };

  const onChangeStarred = (checked: boolean, task: TodoObjType) => {
    if (folder) dispatch(onUpdateTaskStarredStatus([task.id], checked, folder));
    if (label) dispatch(onUpdateTaskStarredStatus([task.id], checked, label));
  };

  const onDeleteSelectedTask = (task: TodoObjType) => {
    if (folder)
      dispatch(onDeleteSelectedTasks([task.id], 'folder', folder, page));
    if (label) dispatch(onDeleteSelectedTasks([task.id], 'label', label, page));
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return taskList;
    } else {
      return taskList.filter((task) =>
        task.title.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };

  const list = onGetFilteredItems();
  return (
    <>
      <AppsHeader>
        <TaskContentHeader
          taskLists={taskList}
          checkedTasks={checkedTasks}
          setCheckedTasks={setCheckedTasks}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
          page={page}
        />
      </AppsHeader>
      <AppsContent>
        <>
          <StyledTodoListDesktop>
            <AppList
              data={list}
              renderItem={(task) => (
                <TaskListItem
                  key={task.id}
                  task={task}
                  onChangeCheckedTasks={onChangeCheckedTasks}
                  checkedTasks={checkedTasks}
                  onChangeStarred={onChangeStarred}
                  onUpdateSelectedTask={onDeleteSelectedTask}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Task"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListDesktop>
          <StyledTodoListMobile>
            <AppList
              data={list}
              renderItem={(task) => (
                <TaskListItemMobile
                  key={task.id}
                  task={task}
                  checkedTasks={checkedTasks}
                  onChangeStarred={onChangeStarred}
                  onChangeCheckedTasks={onChangeCheckedTasks}
                />
              )}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle="Add Task"
                  onClick={onOpenAddTask}
                  placeholder={<TodoListSkeleton />}
                />
              }
            />
          </StyledTodoListMobile>
        </>
      </AppsContent>

      {taskList.length > 0 ? (
        <StyledTodoFooter>
          <AppsPagination
            count={totalTasks}
            page={page}
            onChange={onPageChange}
          />
        </StyledTodoFooter>
      ) : null}

      {isAddTaskOpen ? (
        <AddNewTask
          isAddTaskOpen={isAddTaskOpen}
          onCloseAddTask={onCloseAddTask}
        />
      ) : null}
    </>
  );
};
export default TasksList;
