import React, { useEffect } from 'react';
import MailsList from './MailsList';
import MailDetail from './MailDetail';
import AppsContainer from '@crema/components/AppsContainer';
import MailSidebar from './MailSideBar';
import { useIntl } from 'react-intl';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useRouter } from 'next/router';
import {
  onGetConnectionList,
  onGetMailFolderList,
  onGetMailLabelList,
} from '../../../toolkit/actions';
import { useAppDispatch } from '../../../toolkit/hooks';

const Mail = () => {
  const dispatch = useAppDispatch();
  const { query } = useRouter();

  useEffect(() => {
    dispatch(onGetMailLabelList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetMailFolderList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetConnectionList());
  }, [dispatch]);

  const onGetMainComponent = () => {
    if (query?.all?.[2]) {
      return <MailDetail />;
    } else {
      return <MailsList />;
    }
  };

  const { messages } = useIntl();
  return (
    <AppsContainer
      title={messages['mailApp.mail'] as string}
      sidebarContent={<MailSidebar />}
    >
      <AppPageMeta title="Mail App" />
      {onGetMainComponent()}
    </AppsContainer>
  );
};

export default Mail;
