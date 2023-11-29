import React from 'react';

import {getDynamicTitleStyle} from '..';

import {Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {RenderWhen, RequestStatuses} from '@/utils';

interface InvoiceControlCardProps {
  status: RequestStatuses;
}

export const InvoiceControlCard = (props: InvoiceControlCardProps) => {
  const {status} = props;

  const Title = useStyledTag(Text, ' semibold', () => ({
    ...getDynamicTitleStyle(status, RequestStatuses.fatura_kontrol)?.text,
  }));

  return (
    <Block ml-8 flex rounded-4 p-16 bg-white mb-20 style={{minHeight: 52}}>
      <Title>request_detail.invoice_control</Title>
      <RenderWhen>
        <RenderWhen.If isTrue={status === RequestStatuses.fatura_kontrol}>
          <Text tiny mt-4 opacity60>
            request_detail.invoice_control_subtitle
          </Text>
        </RenderWhen.If>
      </RenderWhen>
    </Block>
  );
};
