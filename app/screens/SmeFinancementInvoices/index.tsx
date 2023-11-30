import React, {useEffect, useRef, useState} from 'react';

import {invoiceMock} from 'data/mock_data';
import moment from 'moment';

import IntroModal, {IntroModalMethods} from './partials/IntroModal';
import LimitDistributionsScrollView from './partials/LimitDistributionsScrollView';
import RequestInvoiceSelectList from './partials/RequestInvoiceSelectList';

import {GetAllowancesCompaniesApiArg, GetInvoicesApiArg, useGetAllowancesCompaniesQuery, useGetInvoicesQuery} from '@/api/tekmarApi';
import {AppButton, AppCard, AppFlatList, AppIcon, AppScreen, Block, CardTypes, FilterActions, SegmentView} from '@/components';
import BadgeFilter from '@/components/App/BadgeFilter';
import {useAppSelector} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

const getInvoicesParams: GetInvoicesApiArg = {
  notifyBuyer: 0,
  minRemainingAmount: 1,
  status: 1,
  payableAmountCurrency: 'TRY',
  startPaymentDate: moment().format('YYYY-MM-DD'),
};

const SmeFinancementInvoices = () => {
  const [activeTab, setActiveTab] = useState(0);
  const IntroModalRef = useRef<IntroModalMethods>(null);

  const {user} = useAppSelector(state => state.auth);

  const getAllowancesCompaniesParams: GetAllowancesCompaniesApiArg = {
    allowanceKind: 1,
    notifyBuyer: 1,
    currency: 'TRY',
    senderCompanyId: user?.CompanyId,
    receiverCompanyId: 301,
    invoices: [],
  };

  const {data: invoicesListData, isFetching: invoiceLoader} = useGetInvoicesQuery(getInvoicesParams);
  const {data: allowancesCompaniesData, isFetching: companiesLoader} = useGetAllowancesCompaniesQuery(getAllowancesCompaniesParams);

  const segmentsTabs = [
    {id: 1, label: 'sme.available_for_discount'},
    {id: 2, label: 'sme.discounted'},
  ];

  const navigationOptions = {
    headerRight: () => <AppButton w-58 h-40 type="icon" icon={<AppIcon color={COLORS.gray} size={24} name={ICONS.Upload} />} />,
  };

  const FilterData = [
    {id: 1, title: 'sme.all', amount: 77},
    {id: 2, title: 'sme.upcoming_payments', amount: 3, icon: ICONS.Check2, iconColor: COLORS.gray},
    {id: 3, title: 'sme.completed_payments', amount: 0, icon: ICONS.Check2, iconColor: COLORS.success},
  ];

  useEffect(() => {
    IntroModalRef?.current?.open();
  }, []);

  return (
    <AppScreen p-0 pb-0 navigationOptions={navigationOptions}>
      <SegmentView type="dark" segments={segmentsTabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <Block flex>
          <LimitDistributionsScrollView allowancesCompaniesData={allowancesCompaniesData} />
          <RequestInvoiceSelectList invoicesListData={invoicesListData} />
        </Block>
        <Block pt-12>
          <BadgeFilter filterData={FilterData} />
          <Block px-20>
            <AppFlatList
              ListHeaderComponent={<FilterActions />}
              contentContainerStyle={{paddingBottom: 122}}
              data={invoiceMock}
              renderItem={props => <AppCard isAllSelected={false} cardType={CardTypes.ISKONTOLANMIS} {...props} />}
            />
          </Block>
        </Block>
      </SegmentView>
      <IntroModal ref={IntroModalRef} />
    </AppScreen>
  );
};

export default SmeFinancementInvoices;
