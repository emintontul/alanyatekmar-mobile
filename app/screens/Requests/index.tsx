import React, {useState} from 'react';

import {Active, Paidup, RejectAndCancel} from './partials';

import {GetAllowancesSenderApiArg, useGetAllowancesSenderQuery} from '@/api/kingdomApi';
import {AppIcon, AppScreen, Block, SegmentView} from '@/components';
import {useAppSelector, useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

const Requests = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {user} = useAppSelector(state => state.auth);
  const segmentsTabs = [
    {id: 1, label: 'requests.active'},
    {id: 2, label: 'requests.reject_cancel'},
    {id: 3, label: 'requests.paid'},
  ];

  const params: GetAllowancesSenderApiArg = {
    senderCompanyId: user?.CompanyId,
  };

  const {data} = useGetAllowancesSenderQuery(params);

  const activeRequests = data?.Allowances?.filter(item => [30, 70, 0].includes(item?.Status));

  const rejectAndCanceledRequests = data?.Allowances?.filter(item => [60, 61].includes(item?.Status));

  const paidUpRequests = data?.Allowances?.filter(item => item?.Status === 71);

  const HeaderButton = useStyledTag(Block, 'p-18');
  const navigationOptions = {
    headerRight: () => (
      <HeaderButton>
        <AppIcon size={20} name={ICONS.Upload} color={COLORS.gray} />
      </HeaderButton>
    ),
  };

  return (
    <AppScreen p-0 navigationOptions={navigationOptions}>
      <SegmentView type="dark" segments={segmentsTabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <Active data={activeRequests} />
        <RejectAndCancel data={rejectAndCanceledRequests} />
        <Paidup data={paidUpRequests} />
      </SegmentView>
    </AppScreen>
  );
};

export default Requests;
