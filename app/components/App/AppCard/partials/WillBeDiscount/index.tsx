import React from 'react';

import {AppIcon, Block, Text} from '@/components';
import {COLORS} from '@/theme';
import {formatCurrency, ICONS, IFinancementInvoices} from '@/utils';

export const WillBeDiscounted = ({item}: {item: IFinancementInvoices | undefined}) => {
  return (
    <Block row wrap>
      <Block>
        <Block pressable row center>
          <Text tiny opacity60>
            create_sme.amount_to_discount
          </Text>
          <Block center middle pr-10 ml-4>
            <AppIcon name={ICONS.LightInfo} size={18} color={COLORS.fontLighter} />
          </Block>
        </Block>
        <Text fs-14 bold pt-2>
          {formatCurrency(Number(item?.RemainingAmount))}
        </Text>
        {/* {item?.discountedAmount && ( */}
        {item?.RemainingAmount && (
          <Text tiny lineThrough>
            {formatCurrency(Number(item?.RemainingAmount))}
          </Text>
        )}
      </Block>

      {/* {item?.delay && ( */}
      {true && (
        <Block align-end>
          <Block>
            <Text>common.expiry_date</Text>
            <Text fs-14 bold pt-2>
              {item?.IssueDate}
            </Text>
          </Block>
        </Block>
      )}

      {/* {!item?.delay && ( */}
      {false && (
        <Block flex-1 left>
          <Block>
            <Text tiny opacity60>
              common.expiry_date
            </Text>
            <Text fs-14 bold pt-2 black>
              {item?.IssueDate}
            </Text>
          </Block>
        </Block>
      )}
    </Block>
  );
};
