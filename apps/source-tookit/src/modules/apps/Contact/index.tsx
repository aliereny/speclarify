import React, { useEffect } from 'react';
import ContactListing from './ContactListing';
import { useIntl } from 'react-intl';
import AppsContainer from '@crema/components/AppsContainer';
import SideBarContent from './ContactSideBar';
import AppPageMeta from '@crema/components/AppPageMeta';
import type { ContactObjType } from '@crema/models/apps/Contact';
import { useAppDispatch } from '../../../toolkit/hooks';
import { onGetFolderList, onGetLabelList } from '../../../toolkit/actions';

export type DataType = {
  data: ContactObjType[];
  count: number;
};
const Contact = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onGetFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetLabelList());
  }, [dispatch]);

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages['contactApp.contact'] as string}
      sidebarContent={<SideBarContent />}
    >
      <AppPageMeta title="Contact App" />
      <ContactListing />
    </AppsContainer>
  );
};

export default Contact;
