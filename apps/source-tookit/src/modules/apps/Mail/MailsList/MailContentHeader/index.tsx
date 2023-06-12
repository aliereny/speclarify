import React from 'react';
import CheckedMailActions from './CheckedMailActions';
import MoreOptions from './MoreOptions';
import { useIntl } from 'react-intl';
import {
  StyledMailContentHeader,
  StyledMailContentHeaderCheckbox,
  StyledMailContentHeaderPagination,
  StyledMailSearch,
} from '../index.styled';
import { useAppSelector } from '../../../../../toolkit/hooks';

type MailContentHeaderProps = {
  checkedMails: number[];
  setCheckedMails: (ids: number[]) => void;
  filterText?: any;
  onSetFilterText: (event: any) => void;
  page: number;
  path: string[];
  onPageChange: (value: number) => void;
};

const MailContentHeader: React.FC<MailContentHeaderProps> = ({
  checkedMails,
  setCheckedMails,
  filterText,
  onSetFilterText,
  page,
  path,
  onPageChange,
}) => {
  const mailList = useAppSelector(({ mailApp }) => mailApp.mailList);

  const totalMails = useAppSelector(({ mailApp }) => mailApp.totalMails);

  const onHandleMasterCheckbox = (event: any) => {
    if (event.target.checked) {
      const mailIds = mailList?.map((mail) => mail.id);
      setCheckedMails(mailIds);
    } else {
      setCheckedMails([]);
    }
  };

  const { messages } = useIntl();

  return (
    <>
      <StyledMailContentHeader>
        <StyledMailContentHeaderCheckbox
          indeterminate={
            checkedMails?.length > 0 && checkedMails?.length < mailList?.length
          }
          checked={
            mailList?.length > 0 && checkedMails?.length === mailList?.length
          }
          onChange={onHandleMasterCheckbox}
        />

        <StyledMailSearch
          placeholder={messages['common.searchHere'] as string}
          value={filterText}
          onChange={(event: any) => onSetFilterText(event.target.value)}
        />

        {checkedMails.length > 0 ? (
          <CheckedMailActions
            checkedMails={checkedMails}
            setCheckedMails={setCheckedMails}
          />
        ) : null}

        <MoreOptions
          checkedMails={checkedMails}
          setCheckedMails={setCheckedMails}
          mailList={mailList || []}
          path={path}
        />
      </StyledMailContentHeader>
      {mailList?.length > 0 ? (
        <StyledMailContentHeaderPagination
          count={totalMails}
          page={page}
          onChange={onPageChange}
        />
      ) : null}
    </>
  );
};

export default MailContentHeader;
