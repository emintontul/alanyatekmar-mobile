import React from 'react';

import moment from 'moment';

import {Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {formatCurrency, IFinancementInvoices, RenderWhen} from '@/utils';

export const CardInvoice = ({item}: {item: IFinancementInvoices | undefined}) => {
  const remainingDay = moment(item?.PaymentDueDate).diff(moment(), 'days');
  const ErrorText = useStyledTag(Text, '', () => ({
    ...getDynamicErrorText(remainingDay),
  }));
  return (
    <Block row wrap>
      <Block flex-1>
        <Text>Fatura Tutarı</Text>
        <Text fs-14 bold pt-2>
          {formatCurrency(Number(item?.PayableAmount))}
        </Text>
      </Block>

      <Block flex align-start>
        <Block>
          <Text>Vade Tarihi</Text>
          <ErrorText fs-14 bold pt-2 black>
            {moment(item?.IssueDate).format('DD.MM.YYYY')}
          </ErrorText>
          <RenderWhen>
            <RenderWhen.If isTrue={remainingDay < 3}>
              <ErrorText fs-12 pt-1>
                {remainingDay > 0 ? `${remainingDay} Gün kaldı` : 'Geciken Ödeme'}
              </ErrorText>
            </RenderWhen.If>
          </RenderWhen>
        </Block>
      </Block>
    </Block>
  );
};

const getDynamicErrorText = (remainingDay: number) => {
  if (remainingDay <= 0) {
    return {
      color: COLORS.error,
    };
  }
  if (remainingDay > 2) {
    return {
      color: COLORS.font,
    };
  }
  if (remainingDay <= 2) {
    return {
      color: COLORS.warning,
    };
  }
};
