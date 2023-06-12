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
import { onUpdateSelectedCalTask } from '../../../../../toolkit/actions';
import { TodoObjType } from '@crema/models/apps/Todo';

type Props = {
  selectedTask: TodoObjType;
};

const TaskDetailHeader = (props: Props) => {
  const { selectedTask } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClickBackButton = () => {
    router.back();
  };

  const onChangeStarred = (checked: boolean) => {
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, isStarred: checked }));
  };

  const onDeleteTask = () => {
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, folderValue: 126 }));
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
