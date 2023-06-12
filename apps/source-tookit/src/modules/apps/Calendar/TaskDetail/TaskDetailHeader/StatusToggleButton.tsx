import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { CheckOutlined } from '@ant-design/icons';
import { StyledTodoDetailStatusBtn } from '../index.styled';
import { onUpdateSelectedCalTask } from '../../../../../toolkit/actions';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import { TodoObjType } from '@crema/models/apps/Todo';

type Props = {
  selectedTask: TodoObjType;
};

const StatusToggleButton = ({ selectedTask }: Props) => {
  const dispatch = useAppDispatch();

  const onChangeTaskStatus = (status: number) => {
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, status }));
  };

  return (
    <>
      {selectedTask.status === 1003 ? (
        <StyledTodoDetailStatusBtn
          className="bg-color"
          onClick={() => onChangeTaskStatus(1001)}
        >
          <CheckOutlined className="check-icon" />
          <IntlMessages id="todo.completed" />
        </StyledTodoDetailStatusBtn>
      ) : (
        <StyledTodoDetailStatusBtn onClick={() => onChangeTaskStatus(3)}>
          <CheckOutlined className="check-icon" />
          <IntlMessages id="todo.markAsCompleted" />
        </StyledTodoDetailStatusBtn>
      )}
    </>
  );
};

export default StatusToggleButton;
