import React from 'react';

import moment from 'moment';
import {useTranslation} from 'react-i18next';

import {AppIcon, Block, Text} from '@/components';
import {COLORS} from '@/theme';
import {formatCurrency, ICONS} from '@/utils';

export const InvoiceRequest = ({item}: {item: any}) => {
  const remainingDay = moment(item?.PaymentDueDate).diff(moment(), 'days');

  const {t} = useTranslation();

  return (
    <Block row wrap>
      <Block flex-1>
        <Block pressable row center>
          <Text tiny opacity60 mr-3>
            sme.discountable_amount
          </Text>
          <Block center middle pr-10>
            <AppIcon name={ICONS.LightInfo} size={18} color={COLORS.gray} />
          </Block>
        </Block>
        <Text fs-14 bold pt-2>
          {formatCurrency(item?.RemainingAmount)}
        </Text>
        <Block row center>
          <Text tiny>common.invoice</Text>
          <Text tiny>: {item?.PayableAmount} TL</Text>
        </Block>
      </Block>

      <Block flex-1 align-end>
        <Block>
          <Text tiny opacity60 mr-3>
            common.expiry_date
          </Text>
          <Text fs-14 bold pt-2 black>
            {!item?.PaymentDueDate ? '-' : moment(item?.PaymentDueDate).format('DD.MM.YYYY')}
          </Text>
          <Text tiny>{item?.PaymentDueDate && t('sme.remaining_day', {amount: remainingDay})}</Text>
        </Block>
      </Block>
    </Block>
  );
};
