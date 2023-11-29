import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {images} from '@/assets';
import {AppButton, AppImage, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {PaymentStackNavigationProps} from '@/navigation/stacks/PaymentStack/types';
import {COLORS} from '@/theme';
import {RenderWhen} from '@/utils';

export const ProcessPriceCard = ({pending}: {pending: boolean}) => {
  const navigation = useNavigation<PaymentStackNavigationProps>();

  const Container = useStyledTag(Block, 'mt-24 rounded-4 pl-8 pr-16 pb-12 pt-8', () => ({
    backgroundColor: COLORS.stroke60,
  }));
  return (
    <Container>
      <Block row>
        <AppImage url={images.figo} width={24} height={24} />
        <Block ml-8 flex>
          <Block row mb-8>
            <Text semibold>kingdom </Text>
            <Text semibold>request_detail.processing_fee</Text>
          </Block>
          <RenderWhen>
            <RenderWhen.If isTrue={pending}>
              <Text tiny>request_detail.transaction_fee_waiting_phase</Text>
            </RenderWhen.If>
            <RenderWhen.If isTrue={!pending}>
              <Block>
                <Text tiny opacity60>
                  request_detail.fee_for_you
                </Text>
                <Block row>
                  <Text bold>90,00 TL</Text>
                  <Text medium opacity40 ml-7 lineThrough>
                    120,00 TL
                  </Text>
                </Block>
                <AppButton onPress={() => navigation.navigate('PAYMENT_MAIN')} mt-10 type="success" title="request_detail.pay" h-40 />
              </Block>
            </RenderWhen.If>
          </RenderWhen>
        </Block>
      </Block>
    </Container>
  );
};
