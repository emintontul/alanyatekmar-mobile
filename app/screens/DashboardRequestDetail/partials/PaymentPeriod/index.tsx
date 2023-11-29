import React from 'react';
import {StyleSheet} from 'react-native';

import {AppFlatList, AppIcon, Block, Shadow, Text} from '@/components';
// import styles from '@/components/Common/AppButton/style';
import {useAppSelector, useTheme} from '@/hooks';
import {PeriodData} from '@/screens/RequestDetail/partials/Period/partials/PeriodCard';
import {COLORS} from '@/theme';
import {formatCurrency, ICONS, RenderWhen, widthPixel} from '@/utils';

interface IPeriodCard {
  summary?: boolean;
}

export const PeriodCard = (props: IPeriodCard) => {
  const {summary} = props;
  const {colors} = useTheme();

  const {totalAmount} = useAppSelector(state => state.requestRedux);

  return (
    <Shadow md>
      <Block bg-white pressable mt-12 p-20 rounded-4>
        <Block row wrap style={styles.invoiceCardItemHeader}>
          <Block flex-1>
            <Text font>common.amount_paid</Text>
            <Text fs-14 bold pt-4>
              {formatCurrency(Number(totalAmount))}
            </Text>
          </Block>

          <Block flex-1 align-start>
            <Block>
              <Text font>app_card.your_payment_date</Text>
              {/* Ödeme alma tarihi serviste gelmiyor o yüzden statik yazıldı */}
              <Text fs-14 bold pt-4 black>
                common.today
              </Text>
            </Block>
          </Block>
        </Block>
        <Block row wrap mt-10 style={styles.invoiceCardItemHeader}>
          <Block flex-1>
            <Text font>common.invoice_amount</Text>
            <Text fs-14 pt-4>
              1
            </Text>
          </Block>

          <Block flex-1 align-start>
            <Block>
              <Text font>common.funding_rate</Text>
              <Text fs-14 pt-4 black>
                -
              </Text>
            </Block>
          </Block>
        </Block>
        <Block row wrap mt-10>
          <RenderWhen>
            <RenderWhen.If isTrue={!summary}>
              <Block flex-1 border>
                <Text font>ABF</Text>
                <Block row center mt-10>
                  <AppIcon name={ICONS.eye} color={colors.info} size={14} />
                  <Text info pl-5>
                    common.view
                  </Text>
                </Block>
                <Block row center mt-10>
                  <AppIcon name={ICONS.Download2} color={colors.info} size={14} />
                  <Text info pl-5>
                    common.download
                  </Text>
                </Block>
              </Block>
            </RenderWhen.If>
          </RenderWhen>

          <Block flex-1 align-start>
            <Block>
              <Text font>common.finance_company</Text>
              <Block row center mt-8>
                {/* <AppImage rounded-4 width={24} height={24} url={item?.company?.image} />
                <Text semibold pl-6>
                  {item?.company?.name}
                </Text> */}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Shadow>
  );
};

export const PaymentPeriod = () => {
  return (
    <Block flex border>
      <AppFlatList contentContainerStyle={styles.contentStyle} data={periodData} renderItem={(item: {item: PeriodData}) => <PeriodCard item={item?.item} />} removeClippedSubviews={false} />
    </Block>
  );
};

const styles = StyleSheet.create({
  invoiceCardItemHeader: {
    borderColor: COLORS.lightGrayOpacity,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  contentStyle: {
    paddingHorizontal: widthPixel(20),
  },
});
