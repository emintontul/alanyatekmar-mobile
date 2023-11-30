import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {useTranslation} from 'react-i18next';

import {useGetAllowancesByAllowanceIdInvoicesQuery} from '@/api/tekmarApi';
import {AppCard, AppFlatList, Block, CardTypes, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {RenderWhen, widthPixel} from '@/utils';

export enum PaymentTypes {
  UPCOMING = 'upcoming',
  PAYMENT_COMPLATE = 'payment_complate',
}

export interface IPaymentTypeProps {
  paymentType: PaymentTypes;
  onPress: (type: PaymentTypes) => void;
  upcomingPaymentLength?: number;
  isPaidPaymentLength?: number;
}

const PaymentTypeView = ({paymentType, onPress, isPaidPaymentLength, upcomingPaymentLength}: IPaymentTypeProps) => {
  const {t} = useTranslation();
  const PaymentType = useStyledTag(Block, 'flex-1 rounded-4 border border-gray center middle', (itemProps: {active?: boolean}) => ({
    backgroundColor: itemProps.active ? COLORS.primaryLightOpacity : '',
    borderColor: itemProps.active ? COLORS.primaryLighter : COLORS.gray,
  }));

  return (
    <Block row wrap mb-16>
      <PaymentType mr-3 active={paymentType === PaymentTypes.UPCOMING} pressable onPress={() => onPress(PaymentTypes.UPCOMING)}>
        <Text defaultGray fs-12 px-15 py-9 textCenter style={[styles.paymentTabText, {color: paymentType === PaymentTypes.UPCOMING ? COLORS.primaryLighter : COLORS.gray}]}>
          {t('request_detail.upcoming_payments', {amount: upcomingPaymentLength})}
        </Text>
      </PaymentType>
      <PaymentType ml-3 active={paymentType === PaymentTypes.PAYMENT_COMPLATE} pressable onPress={() => onPress(PaymentTypes.PAYMENT_COMPLATE)}>
        <Text defaultGray fs-12 px-15 py-9 textCenter style={[styles.paymentTabText, {color: paymentType === PaymentTypes.PAYMENT_COMPLATE ? COLORS.primaryLighter : COLORS.gray}]}>
          {t('request_detail.completed_payments', {amount: isPaidPaymentLength})}
        </Text>
      </PaymentType>
    </Block>
  );
};

const Invoices = ({itemId}: {itemId: number | undefined}) => {
  const [paymentType, setPaymentType] = useState<PaymentTypes>(PaymentTypes.UPCOMING);
  const {data} = useGetAllowancesByAllowanceIdInvoicesQuery({allowanceId: itemId});
  const unPaidPaymentsData = data?.filter(item => !item?.IsPaid);
  const isPaidPaymentsData = data?.filter(item => item?.IsPaid);

  return (
    <Block flex pb-80>
      <Block px-20>
        <Text fontLight py-15>
          request_detail.invoices_header
        </Text>
        <PaymentTypeView
          paymentType={paymentType}
          upcomingPaymentLength={unPaidPaymentsData?.length}
          isPaidPaymentLength={isPaidPaymentsData?.length}
          onPress={(_type: PaymentTypes) => setPaymentType(_type)}
        />
      </Block>

      <RenderWhen>
        <RenderWhen.If isTrue={paymentType === PaymentTypes.UPCOMING}>
          <AppFlatList contentContainerStyle={styles.listContent} data={unPaidPaymentsData} renderItem={({item}: any) => <AppCard cardType={CardTypes.FATURA} item={item} />} />
        </RenderWhen.If>
        <RenderWhen.If isTrue={paymentType === PaymentTypes.PAYMENT_COMPLATE}>
          <AppFlatList contentContainerStyle={styles.listContent} data={isPaidPaymentsData} renderItem={props => <AppCard cardType="odeme_onaylanmis" {...props} />} />
        </RenderWhen.If>
      </RenderWhen>
    </Block>
  );
};

export default Invoices;

const styles = StyleSheet.create({
  paymentTabText: {
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: widthPixel(20),
  },
});
