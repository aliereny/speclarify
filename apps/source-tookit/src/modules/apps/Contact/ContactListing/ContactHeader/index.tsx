import React from 'react';
import { useIntl } from 'react-intl';
import CheckBox from './CheckBox';
import ContactCheckedActions from './ContactCheckedActions';
import {
  StyledContactContentHeader,
  StyledContactHeaderPagination,
  StyledContactSearch,
} from '../index.styled';
import { ViewSelectButtons } from '@crema/modules/apps/Contact';
import { useAppSelector } from '../../../../../toolkit/hooks';

type ContactHeaderProps = {
  checkedContacts: number[];
  setCheckedContacts: (checkedContacts: number[]) => void;
  filterText: string;
  onSetFilterText: (filterText: string) => void;
  onSelectContactsForDelete: (ids: number[]) => void;
  page: number;
  pageView: string;
  onPageChange: (data: number) => void;
  onChangePageView: (page: string) => void;
};

const ContactHeader: React.FC<ContactHeaderProps> = ({
  checkedContacts,
  setCheckedContacts,
  filterText,
  onSetFilterText,
  onSelectContactsForDelete,
  page,
  pageView,
  onPageChange,
  onChangePageView,
}) => {
  const contactList = useAppSelector(
    ({ contactApp }) => contactApp.contactList
  );

  const totalContacts = useAppSelector(
    ({ contactApp }) => contactApp.totalContacts
  );

  const { messages } = useIntl();

  return (
    <>
      <StyledContactContentHeader>
        <CheckBox
          checkedContacts={checkedContacts}
          setCheckedContacts={setCheckedContacts}
        />

        {checkedContacts.length > 0 ? (
          <ContactCheckedActions
            onSelectContactsForDelete={onSelectContactsForDelete}
            checkedContacts={checkedContacts}
            setCheckedContacts={setCheckedContacts}
          />
        ) : null}

        <StyledContactSearch
          value={filterText}
          onChange={(event) => onSetFilterText(event.target.value)}
          placeholder={messages['common.searchHere'] as string}
        />

        <ViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
      </StyledContactContentHeader>
      {contactList?.length > 0 ? (
        <StyledContactHeaderPagination
          count={totalContacts}
          page={page}
          onChange={onPageChange}
        />
      ) : null}
    </>
  );
};

export default ContactHeader;
