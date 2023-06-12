import React from 'react';
import { Select } from 'antd';
import { useIntl } from 'react-intl';
import { TodoObjType, LabelObjType } from '@crema/models/apps/Todo';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedTask } from '../../../../../toolkit/actions';

type TaskLabelProps = {
  selectedTask: TodoObjType;
};

const TaskLabel: React.FC<TaskLabelProps> = ({ selectedTask }) => {
  const labelList = useAppSelector(({ calendarApp }) => calendarApp.labelList);
  const dispatch = useAppDispatch();

  const onChangePriority = (value: string) => {
    const label = labelList.filter((label: LabelObjType) =>
      value.includes(String(label.id))
    );
    dispatch(onUpdateSelectedTask({ ...selectedTask, label }));
  };

  const { messages } = useIntl();
  return (
    <Select
      placeholder={messages['common.label'] as string}
      maxTagCount={2}
      style={{ minWidth: 100 }}
      mode="multiple"
      defaultValue={
        selectedTask?.label.find((label: LabelObjType) => label.id)?.name
      }
      onChange={onChangePriority}
    >
      {labelList.map((label: LabelObjType) => {
        return (
          <Select.Option value={label.id} key={label.id}>
            {label.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};
export default TaskLabel;
