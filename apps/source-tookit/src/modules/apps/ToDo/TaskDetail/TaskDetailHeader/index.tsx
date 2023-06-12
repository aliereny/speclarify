import React from 'react';
import { useRouter } from 'next/router';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppsStarredIcon from '@crema/components/AppsStarredIcon';
import StatusToggleButton from './StatusToggleButton';
import { BiArrowBack } from 'react-icons/bi';
import {
  StyledTodoDetailArrow,
  StyledTodoDetailDeleteIcon,
  StyledTodoStarIconView,
} from '../index.styled';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedTask } from '../../../../../toolkit/actions';
import { TodoObjType } from '@crema/models/apps/Todo';

type TaskDetailHeaderProps = {
  selectedTask: TodoObjType;
};

const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({
  selectedTask,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickBackButton = () => {
    router.back();
  };

  const onChangeStarred = (checked: boolean) => {
    dispatch(onUpdateSelectedTask({ ...selectedTask, isStarred: checked }));
  };

  const onDeleteTask = () => {
    dispatch(onUpdateSelectedTask({ ...selectedTask, folderValue: 126 }));
    router.back();
  };

  return (
    <>
      <StyledTodoDetailArrow
        title={<IntlMessages id="common.back" />}
        onClick={onClickBackButton}
        icon={<BiArrowBack />}
      />

      <StatusToggleButton selectedTask={selectedTask} />

      <StyledTodoStarIconView>
        <AppsStarredIcon item={selectedTask} onChange={onChangeStarred} />
      </StyledTodoStarIconView>

      <StyledTodoDetailDeleteIcon
        deleteAction={onDeleteTask}
        deleteTitle={<IntlMessages id="todo.deleteMessage" />}
      />
    </>
  );
};

export default TaskDetailHeader;
