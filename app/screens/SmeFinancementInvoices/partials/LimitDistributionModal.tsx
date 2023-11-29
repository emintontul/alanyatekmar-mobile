import React, {forwardRef, useImperativeHandle, useState} from 'react';

import {LimitDistributionCards} from '../../../../data/mock_data';

import {AppFlatList, BankLimitCard, Block, BottomModal, LimitCard} from '@/components';
import {window} from '@/theme';
import {IAllowancesCompanies} from '@/utils';

export interface ImperativeHandleProps {
  open: () => void;
}

export interface LimitDistributionModalMethods {
  open: () => void;
}

export const LimitDistributionModal = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
  }));

  const height = window.height - 150;

  return (
    <BottomModal contentStyle="p-0" isVisible={isVisible} setIsVisible={setIsVisible} title={'sme.limit_dist_title'} height={height} closeButton>
      <LimitCard title="sme.your_total_available_limit" rest={119704287} total={275000000} />
      <Block>
        <AppFlatList data={LimitDistributionCards as readonly IAllowancesCompanies[]} contentContainerStyle={{padding: 12}} flex renderItem={BankLimitCard} />
      </Block>
    </BottomModal>
  );
});
