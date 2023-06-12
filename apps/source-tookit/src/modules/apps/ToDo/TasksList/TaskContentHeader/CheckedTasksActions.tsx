import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppsDeleteIcon from '@crema/components/AppsDeleteIcon';
import { useRouter } from 'next/router';
import { Dropdown } from 'antd';
import { MdLabelOutline } from 'react-icons/md';
import AppIconButton from '@crema/components/AppIconButton';
import { StyledTodoHeaderCheckedAction } from '../index.styled';
import { LabelObjType } from '@crema/models/apps/Todo';
import {
  onDeleteSelectedTasks,
  onUpdateTaskLabels,
} from '../../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';

type CheckedTasksActionsProps = {
  checkedTasks: number[];
  setCheckedTasks: (tasks: number[]) => void;
  page: number;
};

const CheckedTasksActions: React.FC<CheckedTasksActionsProps> = ({
  checkedTasks,
  setCheckedTasks,
  page,
}) => {
  const labelList = useAppSelector(({ todoApp }) => todoApp.labelList);

  const router = useRouter();
  const { all } = router.query;
  let folder = '';
  let label = '';
  if (all?.length === 2) {
    label = all[1];
  } else if (all?.length === 1) {
    folder = all[0];
  }
  const dispatch = useAppDispatch();

  const onDeleteTasks = () => {
    if (folder)
      dispatch(onDeleteSelectedTasks(checkedTasks, 'folder', folder, page));
    if (label)
      dispatch(onDeleteSelectedTasks(checkedTasks, 'label', label, page));

    setCheckedTasks([]);
  };

  const onSelectLabel = (key: number) => {
    dispatch(onUpdateTaskLabels(checkedTasks, key));
    setCheckedTasks([]);
  };

  const menuLabel = labelList.map((label: LabelObjType, index: number) => {
    return {
      key: index,
      label: <span onClick={() => onSelectLabel(label.id)}> {label.name}</span>,
    };
  });

  return (
    <StyledTodoHeaderCheckedAction>
      <AppsDeleteIcon
        deleteAction={onDeleteTasks}
        deleteTitle={<IntlMessages id="todo.deleteMessage" />}
      />

      <Dropdown menu={{ items: menuLabel }} trigger={['click']}>
        <AppIconButton
          title={<IntlMessages id="common.label" />}
          icon={<MdLabelOutline />}
        />
      </Dropdown>
    </StyledTodoHeaderCheckedAction>
  );
};
export default CheckedTasksActions;
