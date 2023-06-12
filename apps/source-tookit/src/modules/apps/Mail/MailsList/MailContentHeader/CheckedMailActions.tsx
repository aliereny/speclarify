import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { Dropdown } from 'antd';
import { BiArchiveIn } from 'react-icons/bi';
import { HiOutlineFolderRemove } from 'react-icons/hi';
import { MdLabelOutline } from 'react-icons/md';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import AppIconButton from '@crema/components/AppIconButton';
import { StyledMailCheckedAction } from '../index.styled';
import type { FolderObjType, LabelObjType } from '@crema/models/apps/Mail';
import {
  onUpdateMailFolders,
  onUpdateMailLabels,
} from '../../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';

type CheckedMailActionsProps = {
  checkedMails: number[];
  setCheckedMails: (ids: number[]) => void;
};

const CheckedMailActions: React.FC<CheckedMailActionsProps> = ({
  checkedMails,
  setCheckedMails,
}) => {
  const dispatch = useAppDispatch();
  const labelList = useAppSelector(({ mailApp }) => mailApp.labelList);

  const folderList = useAppSelector(({ mailApp }) => mailApp.folderList);

  const onChangeMailFolder = (key: number) => {
    dispatch(onUpdateMailFolders(checkedMails, key));
    setCheckedMails([]);
  };

  const onSelectLabel = (key: number) => {
    const labelType = labelList.find(
      (label: LabelObjType) => label.id.toString() === key.toString()
    );
    dispatch(onUpdateMailLabels(checkedMails, labelType as LabelObjType));
    setCheckedMails([]);
  };

  const menuLabel = labelList?.map((label: LabelObjType, index: number) => {
    return {
      key: index,
      label: <span onClick={() => onSelectLabel(label.id)}>{label.name}</span>,
    };
  });

  const menuMoveTo = folderList?.map((folder: FolderObjType, index: number) => {
    return {
      key: index,
      label: (
        <span onClick={() => onChangeMailFolder(folder.id)}>{folder.name}</span>
      ),
    };
  });

  return (
    <StyledMailCheckedAction>
      <AppIconButton
        title={<IntlMessages id="common.archive" />}
        onClick={() => onChangeMailFolder(127)}
        icon={<BiArchiveIn />}
      />

      <AppIconButton
        title={<IntlMessages id="common.reportSpam" />}
        onClick={() => onChangeMailFolder(125)}
        icon={<AiOutlineInfoCircle />}
      />

      <AppIconButton
        title={<IntlMessages id="common.trash" />}
        onClick={() => onChangeMailFolder(126)}
        icon={<AiOutlineDelete />}
      />

      <Dropdown menu={{ items: menuLabel }} trigger={['click']}>
        <AppIconButton
          title={<IntlMessages id="common.label" />}
          icon={<MdLabelOutline />}
        />
      </Dropdown>

      <Dropdown menu={{ items: menuMoveTo }} trigger={['click']}>
        <AppIconButton
          title={<IntlMessages id="common.moveTo" />}
          icon={<HiOutlineFolderRemove />}
        />
      </Dropdown>
    </StyledMailCheckedAction>
  );
};

export default CheckedMailActions;
