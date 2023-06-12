import React, { useEffect, useState } from 'react';
import ContactHeader from './ContactHeader';
import IntlMessages from '@crema/helpers/IntlMessages';
import CreateContact from '../CreateContact';
import ContactViewContent from './ContactViewContent';
import ContactDetail from '../ContactDetail';
import AppsPagination from '@crema/components/AppsPagination';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { StyledAppFooter } from './index.styled';
import type { ContactObjType } from '@crema/models/apps/Contact';
import {
  onDeleteContacts,
  onGetContactList,
  onUpdateStarredStatus,
} from '../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { useRouter } from 'next/router';

const ContactListing = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { all } = router.query;

  const [filterText, onSetFilterText] = useState('');

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const [checkedContacts, setCheckedContacts] = useState<number[]>([]);

  const [toDeleteContacts, setToDeleteContacts] = useState<number[]>([]);

  const [isAddContact, onSetIsAddContact] = useState<boolean>(false);

  const [isShowDetail, onShowDetail] = useState<boolean>(false);
  const [page, setPage] = useState(0);

  const [pageView, setPageView] = useState('list');
  const [selectedContact, setSelectedContact] = useState<ContactObjType | null>(
    null
  );

  const contactList = useAppSelector(
    ({ contactApp }) => contactApp.contactList
  );

  const totalContacts = useAppSelector(
    ({ contactApp }) => contactApp.totalContacts
  );

  useEffect(() => {
    setPage(0);
  }, [all]);

  useEffect(() => {
    const path = router.asPath.split('/');
    dispatch(
      onGetContactList(path[path.length - 2], path[path.length - 1], page)
    );
  }, [router.asPath, pageView, page, dispatch]);

  const handleAddContactOpen = () => {
    onSetIsAddContact(true);
  };

  const handleAddContactClose = () => {
    onSetIsAddContact(false);
  };

  const onViewContactDetail = (contact: ContactObjType) => {
    setSelectedContact(contact);
    onShowDetail(true);
  };

  const onOpenEditContact = (contact: ContactObjType | null) => {
    setSelectedContact(contact);
    handleAddContactOpen();
  };

  const onChangeCheckedContacts = (checked: any, id: number) => {
    if (checked) {
      setCheckedContacts(checkedContacts.concat(id));
    } else {
      setCheckedContacts(
        checkedContacts.filter((contactId) => contactId !== id)
      );
    }
  };

  const onChangeStarred = (status: boolean, contact: ContactObjType) => {
    const selectedIdList = [contact.id];
    const path = router.asPath.split('/');
    dispatch(
      onUpdateStarredStatus(selectedIdList, status, path[path.length - 1])
    );
  };

  const onUpdateContact = (contact: ContactObjType) => {
    setSelectedContact(contact);
    handleAddContactClose();
  };

  const onGetFilteredItems = () => {
    if (filterText === '') {
      return contactList;
    } else {
      return contactList.filter((contact) =>
        contact.name.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };

  const onDeleteSelectedContacts = () => {
    const path = router.asPath.split('/');
    dispatch(
      onDeleteContacts(
        path[path.length - 2],
        path[path.length - 1],
        toDeleteContacts,
        page
      )
    );
    setDeleteDialogOpen(false);
    setCheckedContacts([]);
  };

  const onSelectContactsForDelete = (contactIds: number[]) => {
    setToDeleteContacts(contactIds);
    setDeleteDialogOpen(true);
  };

  const list = onGetFilteredItems();

  const onPageChange = (value: number) => {
    setPage(value);
  };
  const onChangePageView = (view: string) => {
    setPageView(view);
  };

  return (
    <>
      <AppsHeader>
        <ContactHeader
          checkedContacts={checkedContacts}
          setCheckedContacts={setCheckedContacts}
          filterText={filterText}
          onSelectContactsForDelete={onSelectContactsForDelete}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
          page={page}
          onChangePageView={onChangePageView}
          pageView={pageView}
        />
      </AppsHeader>
      <AppsContent>
        <ContactViewContent
          list={list}
          pageView={pageView}
          handleAddContactOpen={handleAddContactOpen}
          onChangeCheckedContacts={onChangeCheckedContacts}
          onChangeStarred={onChangeStarred}
          checkedContacts={checkedContacts}
          onSelectContactsForDelete={onSelectContactsForDelete}
          onViewContactDetail={onViewContactDetail}
          onOpenEditContact={onOpenEditContact}
        />
      </AppsContent>

      {contactList?.length > 0 ? (
        <StyledAppFooter>
          <AppsPagination
            count={totalContacts}
            page={page}
            onChange={() => onPageChange}
          />
        </StyledAppFooter>
      ) : null}

      {isAddContact ? (
        <CreateContact
          isAddContact={isAddContact}
          handleAddContactClose={handleAddContactClose}
          selectContact={selectedContact}
          onUpdateContact={onUpdateContact}
        />
      ) : null}

      {isShowDetail ? (
        <ContactDetail
          selectedContact={selectedContact}
          isShowDetail={isShowDetail}
          onShowDetail={onShowDetail}
          onChangeStarred={onChangeStarred}
          onSelectContactsForDelete={onSelectContactsForDelete}
          onOpenEditContact={onOpenEditContact}
        />
      ) : null}

      {isDeleteDialogOpen ? (
        <ConfirmationModal
          open={isDeleteDialogOpen}
          onDeny={setDeleteDialogOpen}
          onConfirm={onDeleteSelectedContacts}
          modalTitle={<IntlMessages id="common.deleteItem" />}
        />
      ) : null}
    </>
  );
};

export default ContactListing;
