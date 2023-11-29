import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import {invoiceMock} from 'data/mock_data';

import {AppCard, AppFlatList, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {IFinancementInvoices, RenderWhen, widthPixel} from '@/utils';

export enum PaymentTypes {
  UPCOMING = 'upcoming',
  PAYMENT_COMPLATE = 'payment_complate',
}

export interface IPaymentTypeProps {
  paymentType: PaymentTypes;
  onPress: (type: PaymentTypes) => void;
}

const PaymentTypeView = ({paymentType, onPress}: IPaymentTypeProps) => {
  const PaymentType = useStyledTag(Block, 'flex-1 rounded-4 border border-gray center middle', (itemProps: {active?: boolean}) => ({
    backgroundColor: itemProps.active ? COLORS.primaryLightOpacity : '',
    borderColor: itemProps.active ? COLORS.primaryLighter : COLORS.gray,
  }));

  return (
    <Block row wrap mb-16>
      <PaymentType mr-3 active={paymentType === PaymentTypes.UPCOMING} pressable onPress={() => onPress(PaymentTypes.UPCOMING)}>
        <Text defaultGray fs-12 px-15 py-9 textCenter style={[styles.paymentTabText, {color: paymentType === PaymentTypes.UPCOMING ? COLORS.primaryLighter : COLORS.gray}]}>
          Yaklaşan Ödemeler (2)
        </Text>
      </PaymentType>
      <PaymentType ml-3 active={paymentType === PaymentTypes.PAYMENT_COMPLATE} pressable onPress={() => onPress(PaymentTypes.PAYMENT_COMPLATE)}>
        <Text defaultGray fs-12 px-15 py-9 textCenter style={[styles.paymentTabText, {color: paymentType === PaymentTypes.PAYMENT_COMPLATE ? COLORS.primaryLighter : COLORS.gray}]}>
          Ödemesi Tamamlananlar (10)
        </Text>
      </PaymentType>
    </Block>
  );
};

export const Invoice = () => {
  const [paymentType, setPaymentType] = useState<PaymentTypes>(PaymentTypes.UPCOMING);

  return (
    <Block flex>
      <Block px-20>
        <Text fontLight py-15>
          Fibabanka hesabınıza giriş yaparak ödemelerinizi yapabilirsiniz.
        </Text>
        <PaymentTypeView paymentType={paymentType} onPress={(_type: PaymentTypes) => setPaymentType(_type)} />
      </Block>

      <RenderWhen>
        <RenderWhen.If isTrue={paymentType === PaymentTypes.UPCOMING}>
          <AppFlatList contentContainerStyle={styles.listContent} data={invoiceMock} renderItem={(item: {item: IFinancementInvoices}) => <AppCard cardType="fatura" item={item.item} />} />
        </RenderWhen.If>
        <RenderWhen.If isTrue={paymentType === PaymentTypes.PAYMENT_COMPLATE}>
          <AppFlatList contentContainerStyle={styles.listContent} data={invoiceMock} renderItem={props => <AppCard cardType="odeme_onaylanmis" {...props} />} />
        </RenderWhen.If>
      </RenderWhen>
    </Block>
  );
};

const styles = StyleSheet.create({
  paymentTabText: {
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: widthPixel(20),
  },
});
