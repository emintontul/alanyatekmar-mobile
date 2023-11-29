import React, {useState} from 'react';

import {Invoice, PaymentPeriod} from './partials';

import {AppScreen, SegmentView} from '@/components';

const DashboardRequestDetail = () => {
  const [activeTab, setActiveTab] = useState(0);

  const segmentsTabs = [
    {id: 1, label: 'common.period'},
    {id: 2, label: 'common.history'},
    {id: 3, label: 'common.invoices'},
  ];

  return (
    <AppScreen bg-white p-0>
      <SegmentView type="light" segments={segmentsTabs} activeTab={activeTab} setActiveTab={setActiveTab}>
        <PaymentPeriod />
        <></>
        <Invoice />
      </SegmentView>
    </AppScreen>
  );
};

export default DashboardRequestDetail;
