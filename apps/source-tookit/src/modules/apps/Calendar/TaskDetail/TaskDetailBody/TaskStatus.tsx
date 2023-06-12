import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';
import { StyledTodoSelectBox } from '../index.styled';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedCalTask } from '../../../../../toolkit/actions';
import { TodoObjType } from '@crema/models/apps/Todo';

type Props = {
  selectedTask: TodoObjType;
};

const TaskStatus = ({ selectedTask }: Props) => {
  const statusList = useAppSelector(
    ({ calendarApp }) => calendarApp.statusList
  );

  const dispatch = useAppDispatch();

  const onChangeStatus = (value: number) => {
    selectedTask.status = value;
    dispatch(onUpdateSelectedCalTask({ ...selectedTask, status: value }));
  };

  const { messages } = useIntl();

  return (
    <StyledTodoSelectBox
      onChange={(value) => onChangeStatus(value as number)}
      value={selectedTask?.status}
      placeholder={messages['common.status'] as string}
    >
      {statusList.map((status) => {
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
