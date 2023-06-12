import React, { createRef, useEffect } from 'react';
import MailDetailHeader from './MailDetailHeader';
import MailDetailBody from './MailDetailBody';
import AppsContent from '@crema/components/AppsContent';
import AppsHeader from '@crema/components/AppsHeader';
import { MailDetailSkeleton } from '@crema/components/MailDetailSkeleton';
import { StyledMailDetail } from './index.styled';
import AppAnimate from '@crema/components/AppAnimate';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import {
  onGetSelectedMail,
  onNullifyMail,
  onUpdateMailReadStatus,
} from '../../../../toolkit/actions';
import { useRouter } from 'next/router';

const MailDetail = () => {
  const contentRef = createRef<any>();
  const router = useRouter();
  const { all } = router.query;
  const id = all?.slice(-1)[0];

  const dispatch = useAppDispatch();
  const selectedMail = useAppSelector(({ mailApp }) => mailApp.selectedMail);

  useEffect(() => {
    dispatch(onGetSelectedMail(Number(id)));
    return () => {
      onNullifyMail();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedMail && !selectedMail.isRead) {
      dispatch(onUpdateMailReadStatus([selectedMail.id], true));
    }
  }, [dispatch, selectedMail]);

  if (!selectedMail) {
    return <MailDetailSkeleton />;
  }

  return (
    <StyledMailDetail ref={contentRef}>
      <AppsHeader>
        <MailDetailHeader selectedMail={selectedMail} />
      </AppsHeader>
      <AppsContent isDetailView>
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <MailDetailBody selectedMail={selectedMail} key={'mail_detail'} />
        </AppAnimate>
      </AppsContent>
    </StyledMailDetail>
  );
};
export default MailDetail;
