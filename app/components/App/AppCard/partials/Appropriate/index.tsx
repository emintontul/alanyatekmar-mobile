import React from 'react';

import moment from 'moment';

import {Block, Text} from '@/components';
import {formatCurrency, IFinancementInvoices} from '@/utils';

export const CardAppropriate = ({item}: {item: IFinancementInvoices | undefined}) => {
  return (
    <Block row wrap>
      <Block flex>
        <Text>Fatura Tutarı</Text>
        <Text fs-14 bold pt-2>
          {formatCurrency(Number(item?.PayableAmount))}
        </Text>
      </Block>

      <Block flex align-start>
        <Block>
          <Text>Vade Tarihi</Text>
          <Text fs-14 bold pt-2 black>
            {moment(item?.IssueDate).format('DD.MM.YYYY')}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};
