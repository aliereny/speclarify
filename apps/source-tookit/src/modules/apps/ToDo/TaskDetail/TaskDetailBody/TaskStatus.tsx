import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';
import { StyledTodoSelectBox } from '../index.styled';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedTask } from '../../../../../toolkit/actions';
import { StatusObjType, TodoObjType } from '@crema/models/apps/Todo';

type TaskDetailHeaderProps = {
  selectedTask: TodoObjType;
};

const TaskStatus: React.FC<TaskDetailHeaderProps> = ({ selectedTask }) => {
  const statusList = useAppSelector(
    ({ calendarApp }) => calendarApp.statusList
  );

  const dispatch = useAppDispatch();
  const onChangeStatus = (value: number) => {
    dispatch(onUpdateSelectedTask({ ...selectedTask, status: value }));
  };

  const { messages } = useIntl();

  return (
    <StyledTodoSelectBox
      onChange={(value) => onChangeStatus(value as number)}
      value={selectedTask?.status}
      placeholder={messages['common.status'] as string}
    >
      {statusList.map((status: StatusObjType) => {
        return (
          <Select.Option key={status.type} value={status.type}>
            {status.name}
          </Select.Option>
        );
      })}
    </StyledTodoSelectBox>
  );
};

export default TaskStatus;
