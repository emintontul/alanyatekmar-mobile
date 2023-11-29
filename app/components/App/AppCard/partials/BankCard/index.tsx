import React from 'react';

import {AppIcon, Block, Text} from '@/components';
import {COLORS} from '@/theme';
import {ICONS, IFinancementInvoices} from '@/utils';

export const BankCard = ({item}: {item: IFinancementInvoices | undefined}) => {
  return (
    <Block row wrap>
      <Block flex-1>
        <Block pressable row center>
          <Text tiny opacity60 mr-3>
            İskontolanabilir Tutar
          </Text>
          <Block center middle pr-10>
            <AppIcon name={ICONS.LightInfo} size={18} color={COLORS.gray} />
          </Block>
        </Block>
        <Text fs-14 bold pt-2>
          {item?.RemainingAmount}
        </Text>
        <Text tiny>Fatura: 98.000,00 TL</Text>
      </Block>

      <Block flex-1 align-end>
        <Block>
          <Text tiny opacity60 mr-3>
            Vade Tarihi
          </Text>
          <Text fs-14 bold pt-2 black>
            {item?.IssueDate}
          </Text>
          <Text tiny>14 gün kaldı</Text>
        </Block>
      </Block>
    </Block>
  );
};
