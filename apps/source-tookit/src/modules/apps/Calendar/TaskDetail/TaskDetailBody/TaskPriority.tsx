import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';
import { StyledTodoSelectBox } from '../index.styled';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { PriorityObjType, TodoObjType } from '@crema/models/apps/Todo';
import { onUpdateSelectedCalTask } from '../../../../../toolkit/actions';

type Props = {
  selectedTask: TodoObjType;
};

const TaskPriority = ({ selectedTask }: Props) => {
  const dispatch = useAppDispatch();
  const priorityList = useAppSelector(
    ({ calendarApp }) => calendarApp.priorityList
  );

  const onChangePriority = (value: number) => {
    const priority = priorityList.find(
      (priority) => priority.type.toString() === value.toString()
    );
    const task = selectedTask;
    task.priority = priority as PriorityObjType;
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, priority }));
  };

  const { messages } = useIntl();
  return (
    <StyledTodoSelectBox
      defaultValue={selectedTask?.priority?.type}
      placeholder={messages['common.priority'] as string}
      onChange={(value) => onChangePriority(value as number)}
    >
      {priorityList.map((priority) => {
        return (
          <Select.Option key={priority.id} value={priority.type}>
            {priority.name}
          </Select.Option>
        );
      })}
    </StyledTodoSelectBox>
  );
};

export default TaskPriority;
