import React from 'react';

import {Block, Text} from '@/components';
import {IFinancementInvoices} from '@/utils';

export const CardDiscounted = ({item}: {item: IFinancementInvoices | undefined}) => {
  return (
    <Block row wrap>
      <Block flex-1>
        <Text>sme.invoice_amount</Text>
        <Text fs-14 bold pt-2>
          {item?.RemainingAmount}
        </Text>
      </Block>

      {true && (
        <Block flex-1 align-end>
          <Block>
            <Text>sme.expiry_date</Text>
            <Text fs-14 bold pt-2>
              {item?.IssueDate}
            </Text>
          </Block>
        </Block>
      )}
      {/* {!item.delay && ( */}
      {false && (
        <Block flex-1 align-end>
          <Block>
            <Text>sme.expiry_date</Text>
            <Text fs-14 bold pt-2 black>
              {item?.IssueDate}
            </Text>
            <Text fs-12 pt-1>
              {/* Kalan Gün */}
              {item?.IssueDate}
            </Text>
          </Block>
        </Block>
      )}
    </Block>
  );
};
