import React from 'react';
import {StyleSheet} from 'react-native';

import {AppIcon, AppImage, Block, Shadow, Text} from '@/components';
import {COLORS} from '@/theme';
import {ICONS} from '@/utils';

export interface PeriodData {
  id: string | number;
  paymentAmount: number | string;
  paymentDate: string;
  invoiceAmount: number | string;
  funding: string;
  company: {
    name: string;
    image: string;
  };
}

export const PeriodCard = ({item}: {item: PeriodData}) => {
  return (
    <Shadow md>
      <Block bg-white pressable mt-8 p-20 rounded-4>
        <Block row wrap style={styles.invoiceCardItemHeader}>
          <Block flex-1>
            <Text font>common.amount_paid</Text>
            <Text fs-14 bold pt-4>
              {item.paymentAmount}
            </Text>
          </Block>

          <Block flex-1 align-start>
            <Block>
              <Text font>app_card.your_payment_date</Text>
              <Text fs-14 bold pt-4 black>
                {item.paymentDate}
              </Text>
            </Block>
          </Block>
        </Block>
        <Block row wrap mt-10 style={styles.invoiceCardItemHeader}>
          <Block flex-1>
            <Text font>common.invoice_amount</Text>
            <Text fs-14 pt-4>
              {item.invoiceAmount}
            </Text>
          </Block>

          <Block flex-1 align-start>
            <Block>
              <Text font>common.funding_rate</Text>
              <Text fs-14 pt-4 black>
                {item.funding}
              </Text>
            </Block>
          </Block>
        </Block>
        <Block row wrap mt-10>
          <Block flex-1>
            <Text font>ABF</Text>
            <Block row center mt-10>
              <AppIcon name={ICONS.eye} color="#6D98F5" size={14} />
              <Text info pl-5>
                common.view
              </Text>
            </Block>
            <Block row center mt-10>
              <AppIcon name={ICONS.Download2} color="#6D98F5" size={14} />
              <Text info pl-5>
                common.download
              </Text>
            </Block>
          </Block>

          <Block flex-1 align-start>
            <Block>
              <Text font>common.finance_company</Text>
              <Block row center mt-8>
                <AppImage rounded-4 width={24} height={24} url={item?.company?.image} />
                <Text semibold pl-6>
                  {item?.company?.name}
                </Text>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Shadow>
  );
};

const styles = StyleSheet.create({
  invoiceCardItemHeader: {
    borderColor: COLORS.lightGrayOpacity,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});
