import React from 'react';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {UpcomingPaymentCard} from './partials/UpcomingPaymentCard';

import {UpcomingPaymentsData} from '@/../data/mock_data';
import {images} from '@/assets/images';
import {AppImage, AppScreen, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {COLORS} from '@/theme';
import {fontPixel, IUpcomingPayment} from '@/utils';

interface UpcomingPaymentListProps {
  item: IUpcomingPayment;
}

const UpcomingPaymentList = ({item}: UpcomingPaymentListProps) => {
  const PaymentListContainer = useStyledTag(Block, 'row', () => ({
    borderTopColor: '#dedede',
    borderTopWidth: 0.8,
  }));
  const DateBox = useStyledTag(Block, 'w-62 pt-22 center', () => ({
    borderRightWidth: 0.8,
    borderRightColor: '#dedede',
  }));

  return (
    <PaymentListContainer>
      <DateBox>
        <Text subtitle>{moment(item.date).format('DD')}</Text>
        <Text caption>{moment(item.date).format('MMM')}</Text>
      </DateBox>
      <Block flex pt-12 px-10>
        {item.payments.map((paymentItem, index: number) => (
          <UpcomingPaymentCard key={index} item={paymentItem} />
        ))}
      </Block>
    </PaymentListContainer>
  );
};

// Ödeme olduğunda görünecek sayfa
const UpcomingPaymentSection = () => {
  const navigation = useNavigation<MainStackNavigationPropsType>();
  const InfoBox = useStyledTag(Block, 'bg-gray p-20 pb-24');

  const tagsStyles = {
    p: {
      color: COLORS.font,
      fontSize: fontPixel(14),
      margin: 0,
    },
  };

  return (
    <AppScreen bg-white p-0 scroll>
      <InfoBox>
        <Text translateText border style={tagsStyles} innerText={{amount: '100.000'}}>
          upcoming_payments.head
        </Text>
        <Text tiny mt-16 opacity60>
          upcoming_payments.subtitle
        </Text>
      </InfoBox>
      <Block flex bg-white>
        <Block py-20 px-20 row center justify-between>
          <Text subtitle>upcoming_payments.payment_plan</Text>
          <Text info pressable onPress={() => navigation.push('SME_INVOICES')}>
            Faturaları Gör
          </Text>
        </Block>
        <Block>
          {UpcomingPaymentsData?.map((upcomingPaymentItem: IUpcomingPayment, index: number) => (
            <UpcomingPaymentList key={index} item={upcomingPaymentItem} />
          ))}
        </Block>
      </Block>
    </AppScreen>
  );
};

// Ödeme olmadığında görünecek sayfa
const EmptySection = () => {
  return (
    <AppScreen bg-white p-0>
      <Block flex center middle mb-72>
        <AppImage resizeMode={'contain'} url={images.confirmed} height={75} width={66} />
        <Text caption mt-32 textCenter>
          upcoming_payments.empty_list_message
        </Text>
      </Block>
    </AppScreen>
  );
};

// Main area
const UpcomingPayments = () => {
  return true ? <UpcomingPaymentSection /> : <EmptySection />;
};

export default UpcomingPayments;
