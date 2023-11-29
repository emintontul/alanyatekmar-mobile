import React, {useState} from 'react';

import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {History, Invoices, Period} from './partials';

import {AppScreen, Block, SegmentView, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {SmeStackNavigationRouteType} from '@/navigation/stacks/SmeStack/types';
import {COLORS} from '@/theme';
import {formatCurrency} from '@/utils';

const RequestDetail = () => {
  const route = useRoute<SmeStackNavigationRouteType<'REQUEST_DETAIL'>>();

  const {item} = route.params;

  const [activeTab, setActiveTab] = useState(0);

  const {t} = useTranslation();

  const segmentsTabs = [
    {id: 1, label: 'common.period'},
    {id: 2, label: 'common.history'},
    {id: 3, label: 'common.invoices'},
  ];

  const HeaderButton = useStyledTag(Text, 'p-10 pr-20 tinyGray medium');
  const navigationOptions = {
    headerTitle: `${t('request_detail.title')} #${item?.Id}`,
    headerRight: () => item?.Status !== 71 && <HeaderButton>request_detail.cancel</HeaderButton>,
  };

  const Header = useStyledTag(Block, 'row center px-20 h-72', () => ({
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrayOpacity,
  }));

  return (
    <AppScreen p-0 navigationOptions={navigationOptions}>
      <Header bg-white>
        <Block>
          <Text tiny opacity60>
            request_detail.discount_amount
          </Text>
          <Text bold>{formatCurrency(item?.TotalPayableAmount)}</Text>
        </Block>
        <Block ml-60>
          <Text tiny opacity60>
            request_detail.invoice_amount
          </Text>
          <Text bold>{item?.TotalInvoiceCount}</Text>
        </Block>
      </Header>
      <Block h-full>
        <SegmentView type="light" segments={segmentsTabs} activeTab={activeTab} setActiveTab={setActiveTab}>
          <Period item={item} />
          <History itemId={item?.Id} />
          <Invoices itemId={item?.Id} />
        </SegmentView>
      </Block>
    </AppScreen>
  );
};

export default RequestDetail;
