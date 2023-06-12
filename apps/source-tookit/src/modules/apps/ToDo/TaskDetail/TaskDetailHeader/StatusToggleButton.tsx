import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { CheckOutlined } from '@ant-design/icons';
import { StyledTodoDetailStatusBtn } from '../index.styled';
import { onUpdateSelectedTask } from '../../../../../toolkit/actions';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { TodoObjType } from '@crema/models/apps/Todo';

type StatusToggleButtonProps = {
  selectedTask: TodoObjType;
};

const StatusToggleButton: React.FC<StatusToggleButtonProps> = ({
  selectedTask,
}) => {
  const dispatch = useAppDispatch();

  const onChangeTaskStatus = (status: number) => {
    dispatch(onUpdateSelectedTask({ ...selectedTask, status }));
  };

  return selectedTask.status === 3 ? (
    <StyledTodoDetailStatusBtn
      className="bg-color"
      onClick={() => onChangeTaskStatus(1)}
    >
      <CheckOutlined className="check-icon" />
      <IntlMessages id="todo.completed" />
    </StyledTodoDetailStatusBtn>
  ) : (
    <StyledTodoDetailStatusBtn onClick={() => onChangeTaskStatus(3)}>
      <CheckOutlined className="check-icon" />
      <IntlMessages id="todo.markAsCompleted" />
    </StyledTodoDetailStatusBtn>
  );
};

export default StatusToggleButton;
