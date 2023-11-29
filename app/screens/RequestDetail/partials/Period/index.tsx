import React, {useRef} from 'react';
import {ScrollView} from 'react-native';

import {AddToCalendarMethods, AddToCalendarModal} from './partials/AddToCalendarModal';
import {FinancingPhaseCard} from './partials/FinancingPhaseCard';
import {InvoiceControlCard} from './partials/InvoiceControlCard';
import {OfferProcessCard} from './partials/OfferProcessCard';
import {PeriodCard, PeriodData} from './partials/PeriodCard';

import {images} from '@/assets';
import {AppButton, AppFlatList, AppImage, Block, Text, VerticalStepper} from '@/components';
import {COLORS} from '@/theme';
import {RenderWhen, RequestStatuses} from '@/utils';

interface PeriodProps {
  item: unknown;
}

const SuccessfulMessage = () => {
  return (
    <Block p-16 bg-white row rounded-4>
      <AppImage url={images.successMessage} width={66} height={64} />
      <Block ml-16 flex>
        <Text buttonTitle black>
          common.congrulations
        </Text>
        <Text tiny opacity60>
          request_detail.congrulations_message
        </Text>
      </Block>
    </Block>
  );
};

const Period = (props: PeriodProps) => {
  const {item: RequestItem} = props;
  const status = RequestItem?.Status;

  const statusNumbers = [29, 30, 70];
  const currentStep = statusNumbers.indexOf(status) + 1;

  const AddToCalendarModalRef = useRef<AddToCalendarMethods>(null);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Block p-16 pressable pb-100 h-full>
        {/* Eğer fatura tamamlanmış ve başarılı ise */}
        <RenderWhen>
          <RenderWhen.If isTrue={status === RequestStatuses.basarili}>
            <Block flex>
              <SuccessfulMessage />
              <AppFlatList data={[1]} renderItem={({item}) => <PeriodCard item={item} />} removeClippedSubviews={false} />
              <Block>
                <AppButton h-48 type="primary" title="request_detail.check_payment_plan" />
                <AppButton onPress={() => AddToCalendarModalRef?.current?.open()} h-48 mt-8 type="secondary" title="request_detail.add_calendar" titleColor={COLORS.gray} />
              </Block>
            </Block>
          </RenderWhen.If>
        </RenderWhen>
        {/* Eğer fatura süreci hala devam ediyor ise */}
        <RenderWhen>
          <RenderWhen.If isTrue={status !== RequestStatuses.basarili}>
            <VerticalStepper initialStep={currentStep}>
              <InvoiceControlCard status={status} />
              <OfferProcessCard requestId={RequestItem?.Id} status={status} />
              <FinancingPhaseCard status={status} />
            </VerticalStepper>
          </RenderWhen.If>
        </RenderWhen>
      </Block>
      <AddToCalendarModal ref={AddToCalendarModalRef} />
    </ScrollView>
  );
};

export default Period;

// Stepper kartların dinamik title stillendirmesi
export const getDynamicTitleStyle = (status: number, requestStatus: number) => {
  if (status === requestStatus) {
    return {
      text: {
        color: COLORS.font,
      },
    };
  }
  if (status > requestStatus) {
    return {
      text: {
        color: COLORS.success,
      },
    };
  }
  if (status < requestStatus) {
    return {
      text: {
        color: COLORS.gray,
      },
    };
  }
};
