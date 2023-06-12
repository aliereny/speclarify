import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useRouter } from 'next/router';
import { Dropdown } from 'antd';
import { BiArchiveIn, BiArrowBack } from 'react-icons/bi';
import { HiOutlineMailOpen } from 'react-icons/hi';
import { FiMoreVertical } from 'react-icons/fi';
import { MdLabelOutline } from 'react-icons/md';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import AppIconButton from '@crema/components/AppIconButton';
import {
  StyledMailDetailActionHeader,
  StyledMailDetailArrow,
} from '../index.styled';
import type { LabelObjType, MailObjType } from '@crema/models/apps/Mail';
import { useAppSelector, useAppDispatch } from '../../../../../toolkit/hooks';
import { onUpdateSelectedMail } from '../../../../../toolkit/actions';

type MailDetailHeaderProps = {
  selectedMail: MailObjType;
};

const MailDetailHeader: React.FC<MailDetailHeaderProps> = ({
  selectedMail,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const labelList = useAppSelector(({ mailApp }) => mailApp.labelList);

  const onClickBackButton = () => {
    router.back();
  };

  const onSelectLabel = (key: number) => {
    const labelType = labelList.find(
      (label: LabelObjType) => label.id.toString() === key.toString()
    ) as LabelObjType;
    dispatch(onUpdateSelectedMail({ ...selectedMail, label: labelType! }));
  };

  const onChangeMailFolder = (type: number) => {
    dispatch(onUpdateSelectedMail({ ...selectedMail, folderValue: type }));
    router.back();
  };

  const onChangeReadStatus = () => {
    dispatch(onUpdateSelectedMail({ ...selectedMail, isRead: false }));
    router.back();
  };

  const onChangeStarredStatus = () => {
    dispatch(
      onUpdateSelectedMail({
        ...selectedMail,
        isStarred: !selectedMail.isStarred,
      })
    );
  };

  const menuItems = labelList.map((label: LabelObjType, index: number) => {
    return {
      key: index,
      label: <span onClick={() => onSelectLabel(label.id)}>{label.name}</span>,
    };
  });

  const menuMoveTo = [
    {
      key: '01',
      label: (
        <span onClick={onChangeReadStatus}>
          <IntlMessages id="mailApp.markAsUnread" />
        </span>
      ),
    },
    {
      key: '02',
      label: (
        <span onClick={onChangeStarredStatus}>
          {selectedMail.isStarred ? (
            <IntlMessages id="mailApp.markAsNotImportant" />
          ) : (
            <IntlMessages id="mailApp.markAsImportant" />
          )}
        </span>
      ),
    },
  ];

  if (!selectedMail) return null;
  return (
    <>
      <StyledMailDetailArrow
        title={<IntlMessages id="common.back" />}
        icon={<BiArrowBack />}
        onClick={onClickBackButton}
      />
      <h5 className="mb-0 text-truncate">
        {selectedMail.subject ? selectedMail.subject : null}
      </h5>
      <StyledMailDetailActionHeader>
        <AppIconButton
          title={<IntlMessages id="common.archive" />}
          icon={<BiArchiveIn />}
          onClick={() => onChangeMailFolder(127)}
        />

        <AppIconButton
          title={<IntlMessages id="common.reportSpam" />}
          icon={<AiOutlineInfoCircle />}
          onClick={() => onChangeMailFolder(125)}
        />

        <AppIconButton
          title={<IntlMessages id="common.trash" />}
          icon={<AiOutlineDelete />}
          onClick={() => onChangeMailFolder(126)}
        />

        <AppIconButton
          title={<IntlMessages id="mailApp.markAsUnread" />}
          icon={<HiOutlineMailOpen />}
          onClick={() => onChangeReadStatus()}
        />

        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <AppIconButton
            title={<IntlMessages id="common.label" />}
            icon={<MdLabelOutline />}
          />
        </Dropdown>

        <Dropdown menu={{ items: menuMoveTo }} trigger={['click']}>
          <AppIconButton
            title={<IntlMessages id="common.more" />}
            icon={<FiMoreVertical />}
          />
        </Dropdown>
      </StyledMailDetailActionHeader>
    </>
  );
};

export default MailDetailHeader;
