import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';
import { StyledTodoSelectBox } from '../index.styled';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedTask } from '../../../../../toolkit/actions';
import { PriorityObjType, TodoObjType } from '@crema/models/apps/Todo';

type TaskPriorityProps = {
  selectedTask: TodoObjType;
};

const TaskPriority: React.FC<TaskPriorityProps> = ({ selectedTask }) => {
  const dispatch = useAppDispatch();
  const priorityList = useAppSelector(
    ({ calendarApp }) => calendarApp.priorityList
  );

  const onChangePriority = (value: number) => {
    const priority = priorityList.find(
      (priority: PriorityObjType) => priority.type === value
    ) as PriorityObjType;
    dispatch(onUpdateSelectedTask({ ...selectedTask, priority }));
  };

  const { messages } = useIntl();
  return (
    <StyledTodoSelectBox
      defaultValue={selectedTask?.priority?.type}
      placeholder={messages['common.priority'] as string}
      onChange={(value) => onChangePriority(value as number)}
    >
      {priorityList.map((priority: PriorityObjType) => {
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
