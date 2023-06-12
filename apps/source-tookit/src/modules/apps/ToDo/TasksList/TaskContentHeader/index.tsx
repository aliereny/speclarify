import React from 'react';
import { useIntl } from 'react-intl';
import CheckedTasksActions from './CheckedTasksActions';
import { Checkbox } from 'antd';
import {
  StyledContentHeader,
  StyledTodoHeaderCheckboxView,
  StyledTodoHeaderPagination,
  StyledTodoSearch,
} from '../index.styled';
import { SelectTasksDropdown } from '@crema/modules/apps/ToDo';

import { TodoObjType } from '@crema/models/apps/Todo';

type TaskContentHeaderProps = {
  taskLists: TodoObjType[];
  checkedTasks: number[];
  setCheckedTasks: (checkedTasks: number[]) => void;
  filterText: string;
  onSetFilterText: (text: string) => void;
  onViewModeSelect?: (mode: string) => void;
  onPageChange: (data: number) => void;
  page: number;
};

const TaskContentHeader: React.FC<TaskContentHeaderProps> = ({
  taskLists,
  checkedTasks,
  setCheckedTasks,
  filterText,
  onSetFilterText,
  page,
  onPageChange,
}) => {
  const onHandleMasterCheckbox = (event: any) => {
    if (event.target.checked) {
      const taskIds = taskLists?.map((task) => task.id);
      setCheckedTasks(taskIds);
    } else {
      setCheckedTasks([]);
    }
  };

  const onSelectTasks = (value: number) => {
    switch (value) {
      case 0:
        setCheckedTasks(taskLists?.map((task) => task.id));
        break;
      case 1:
        setCheckedTasks([]);
        break;

      case 2:
        setCheckedTasks(
          taskLists?.filter((task) => task.isStarred).map((task) => task.id)
        );
        break;

      case 3:
        setCheckedTasks(
          taskLists?.filter((task) => task.isAttachment).map((task) => task.id)
        );
        break;

      default:
        setCheckedTasks([]);
    }
  };

  const { messages } = useIntl();

  return (
    <>
      <StyledContentHeader>
        <StyledTodoHeaderCheckboxView>
          <Checkbox
            indeterminate={
              checkedTasks?.length > 0 &&
              checkedTasks?.length < taskLists?.length
            }
            checked={
              taskLists?.length > 0 && checkedTasks.length === taskLists?.length
            }
            onChange={onHandleMasterCheckbox}
          />
        </StyledTodoHeaderCheckboxView>

        <SelectTasksDropdown onSelectTasks={onSelectTasks} />

        <StyledTodoHeaderCheckboxView>
          {checkedTasks.length > 0 ? (
            <CheckedTasksActions
              checkedTasks={checkedTasks}
              setCheckedTasks={setCheckedTasks}
              page={page}
            />
          ) : null}
        </StyledTodoHeaderCheckboxView>

        <StyledTodoSearch
          placeholder={messages['common.searchHere'] as string}
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
        />
      </StyledContentHeader>
      {taskLists?.length > 0 && (
        <StyledTodoHeaderPagination
          count={taskLists?.length}
          page={page}
          onChange={onPageChange}
        />
      )}
    </>
  );
};

export default TaskContentHeader;
