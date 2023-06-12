import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import { FiMoreVertical } from 'react-icons/fi';
import { Dropdown } from 'antd';
import AppIconButton from '@crema/components/AppIconButton';
import type { MailObjType } from '@crema/models/apps/Mail';
import { useAppDispatch } from '../../../../../toolkit/hooks';
import {
  onUpdateMailReadStatus,
  onUpdateMailStarredStatus,
} from '../../../../../toolkit/actions';

type MoreOptionsProps = {
  checkedMails: number[];
  setCheckedMails: (ids: number[]) => void;
  mailList: MailObjType[];
  path: string[];
};

const MoreOptions: React.FC<MoreOptionsProps> = ({
  checkedMails,
  setCheckedMails,
  mailList,
  path,
}) => {
  const dispatch = useAppDispatch();

  let unReadOption;
  let readOption;
  let starredOption;
  let unStarredOption;

  mailList.map((mail: MailObjType) => {
    if (checkedMails.includes(mail.id) && mail.isRead) {
      unReadOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isRead) {
      readOption = true;
    }
    if (checkedMails.includes(mail.id) && mail.isStarred) {
      unStarredOption = true;
    }
    if (checkedMails.includes(mail.id) && !mail.isStarred) {
      starredOption = true;
    }
    return null;
  });

  const onChangeReadStatus = (statusValue: number) => {
    const status = !!statusValue;
    dispatch(onUpdateMailReadStatus(checkedMails, status));
    setCheckedMails([]);
  };

  const onChangeAllReadStatus = (statusValue: number) => {
    const status = !!statusValue;
    const checkedMails = mailList?.map((mail) => mail.id);
    dispatch(onUpdateMailReadStatus(checkedMails, status));
    setCheckedMails([]);
  };

  const onChangeAllStarred = (status: number) => {
    const allMails = mailList.map((mail) => mail.id);
    dispatch(
      onUpdateMailStarredStatus(allMails, status, path[path.length - 1])
    );
    setCheckedMails([]);
  };

  const onChangeStarredStatus = (status: number) => {
    dispatch(
      onUpdateMailStarredStatus(checkedMails, status, path[path.length - 1])
    );
    setCheckedMails([]);
  };

  const menuViewMore = [
    {
      key: 1,
      label: readOption ? (
        <span onClick={() => onChangeReadStatus(1)}>
          <IntlMessages id="mailApp.markAsRead" />
        </span>
      ) : null,
    },
    {
      key: 2,
      label: unReadOption ? (
        <span onClick={() => onChangeReadStatus(0)}>
          <IntlMessages id="mailApp.markAsUnread" />
        </span>
      ) : null,
    },
    {
      key: 3,
      label: starredOption ? (
        <span onClick={() => onChangeStarredStatus(1)}>
          <IntlMessages id="mailApp.markAsImportant" />
        </span>
      ) : null,
    },
    {
      key: 4,
      label: unStarredOption ? (
        <span onClick={() => onChangeStarredStatus(0)}>
          <IntlMessages id="mailApp.markAsNotImportant" />
        </span>
      ) : null,
    },
  ];

  const menuViewMoreTo = [
    {
      key: '01',
      label: (
        <span onClick={() => onChangeAllReadStatus(1)}>
          <IntlMessages id="mailApp.markAllAsRead" />
        </span>
      ),
    },
    {
      key: '02',
      label: (
        <span onClick={() => onChangeAllReadStatus(0)}>
          <IntlMessages id="mailApp.markAllAsUnread" />
        </span>
      ),
    },
    {
      key: '03',
      label: (
        <span onClick={() => onChangeAllStarred(1)}>
          <IntlMessages id="mailApp.markAllAsImportant" />
        </span>
      ),
    },
    {
      key: '04',
      label: (
        <span onClick={() => onChangeAllStarred(0)}>
          <IntlMessages id="mailApp.markAllAsNotImportant" />
        </span>
      ),
    },
  ];

  return (
    <>
      {checkedMails.length > 0 ? (
        <Dropdown menu={{ items: menuViewMore }} trigger={['click']}>
          <AppIconButton
            title={<IntlMessages id="common.more" />}
            icon={<FiMoreVertical />}
          />
        </Dropdown>
      ) : (
        <Dropdown menu={{ items: menuViewMoreTo }} trigger={['click']}>
          <AppIconButton
            title={<IntlMessages id="common.more" />}
            icon={<FiMoreVertical />}
          />
        </Dropdown>
      )}
    </>
  );
};

export default MoreOptions;
