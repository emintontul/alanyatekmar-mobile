/* eslint-disable import/no-extraneous-dependencies */
import React, {useRef, useState} from 'react';

import RNBlobUtil from 'react-native-blob-util';

import {BankDetailCard} from './BankDetailCard';
import {ProcessPriceCard} from './ProcessPriceCard';
import {getDynamicTitleStyle} from '..';

import {baseURL} from '@/api/config';
import {useGetAllowancesByAllowanceIdFinancersQuery} from '@/api/tekmarApi';
import { AppFlatList, Block, InfoCard, Text} from '@/components';
import {useAppSelector, useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {ICONS, RenderWhen, RequestStatuses} from '@/utils';

interface OfferProcessCardProps {
  status: RequestStatuses;
  requestId: number | undefined;
}

export const OfferProcessCard = (props: OfferProcessCardProps) => {
  const {status, requestId} = props;
  const [pending] = useState(false);
  const [isPaid] = useState(true);
  const {data} = useGetAllowancesByAllowanceIdFinancersQuery({allowanceId: requestId});

  const token = useAppSelector(state => state?.auth?.token);

  const Container = useStyledTag(Block, 'row flex ml-8 column mb-20');
  const Title = useStyledTag(Text, 'semibold', () => ({
    ...getDynamicTitleStyle(status, RequestStatuses.teklif_sureci)?.text,
  }));
  const Subtitle = useStyledTag(Text, 'tiny mt-4 opacity60');

  const handleFinancerAccept = async () => {
    try {
      const url = baseURL + '/documents/allowance/' + 55117 + '/abf/' + 446;

      const res = await RNBlobUtil.fetch('GET', url, {
        Token: token || '',
      });

      const base64Str = res.base64();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Block p-16 flex rounded-4 bg-white>
        <Block row justify-between>
          <Title>request_detail.offer_process</Title>
          {isPaid && <Text semibold>FibaBanka</Text>}
        </Block>

        <RenderWhen>
          <RenderWhen.If isTrue={status === RequestStatuses.teklif_sureci}>
            <Subtitle>request_detail.offer_process_subtitle</Subtitle>
            {isPaid ? (
              <InfoCard
                iconSize={21}
                contentStyle="px-12 align-start pr-0"
                iconColor={COLORS.success}
                iconLeft={ICONS.Check2}
                mt-12
                isVisible={true}
                type="success"
                text="request_detail.paid_info_text"
              />
            ) : (
              <ProcessPriceCard pending={pending} />
            )}
          </RenderWhen.If>
        </RenderWhen>
      </Block>
      <RenderWhen>
        <RenderWhen.If isTrue={status === RequestStatuses.teklif_sureci}>
          <AppFlatList data={data || []} renderItem={({item}) => <BankDetailCard onConfirm={() => handleFinancerAccept(item?.CompanyId)} pending={pending} isPaid={isPaid} item={item} />} />
        </RenderWhen.If>
      </RenderWhen>
    </Container>
  );
};
