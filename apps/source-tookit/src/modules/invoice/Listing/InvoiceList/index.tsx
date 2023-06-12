import React, { useEffect, useState } from 'react';
import InvContentHeader from './InvContentHeader';
import AppsHeader from '@crema/components/AppsHeader';
import AppsContent from '@crema/components/AppsContent';
import { InvoiceTable } from '@crema/modules/invoice';
import { useRouter } from 'next/router';
import { onGetInvoiceList, onUpdateInvoice } from '../../../../toolkit/actions';
import { useAppSelector, useAppDispatch } from '../../../../toolkit/hooks';
import { isEmptyObject } from '@crema/helpers';
import AppLoader from '@crema/components/AppLoader';
import { InvoiceType } from '@crema/models/invoice';

const InvoiceList = () => {
  const { asPath, query } = useRouter();
  const { all } = query;
  const dispatch = useAppDispatch();
  const loading = useAppSelector(({ common }) => common.loading);
  const invoiceList = useAppSelector(
    ({ invoiceApp }) => invoiceApp.invoiceList
  );

  let folder = '';

  if (all && all.length === 1) {
    folder = all?.[0];
  }

  const [page, setPage] = useState(0);

  const onPageChange = (value: number) => {
    setPage(value);
  };
  const [filterText, onSetFilterText] = useState('');

  const [checkedInvs, setCheckedInvs] = useState<number[]>([]);

  useEffect(() => {
    dispatch(onGetInvoiceList({ folder: folder, page: page }));
  }, [dispatch, page, folder, asPath]);

  const onChangeStatus = (invoice: InvoiceType, status: number) => {
    dispatch(onUpdateInvoice({ ...invoice, folderValue: status }));
  };

  return !isEmptyObject(invoiceList) ? (
    <>
      <AppsHeader>
        <InvContentHeader
          page={page}
          invoiceList={invoiceList || []}
          checkedInvs={checkedInvs}
          setCheckedInvs={setCheckedInvs}
          filterText={filterText}
          onSetFilterText={onSetFilterText}
          onPageChange={onPageChange}
        />
      </AppsHeader>
      <AppsContent>
        <InvoiceTable
          invoiceData={invoiceList || []}
          loading={loading}
          onChangeStatus={onChangeStatus}
        />
      </AppsContent>
    </>
  ) : (
    <AppLoader />
  );
};

export default InvoiceList;
