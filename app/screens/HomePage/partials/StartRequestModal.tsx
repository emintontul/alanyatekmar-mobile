import React, {forwardRef, memo, Ref, useImperativeHandle, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {FinancingBalances} from 'data/mock_data';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

import {AppInput, Block, BottomModal, CalendarDateSelect, DateTimePicker} from '@/components';
import FastSelectDay, {BadgeItemProps} from '@/components/App/FastSelectDay';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {heightPixel, ICONS} from '@/utils';

export interface StartRequestModalMethods {
  open: () => void;
}

interface IStartRequestModal {
  currentSwipe?: boolean;
}

const StartRequestModal = forwardRef((props: IStartRequestModal, ref: Ref<StartRequestModalMethods>) => {
  const {currentSwipe} = props;
  const [startRequestModal, setStartRequestModal] = useState(false);
  const [visibleDateTimePicker, setVisibleDateTimePicker] = useState(false);
  const [inputDate, setInputDate] = useState<string>(moment(new Date()).format('DD MM YYYY'));
  const [currentDayItem, setCurrentDayItem] = useState<BadgeItemProps>({day: 15, id: 1});
  const {t} = useTranslation();

  const navigation = useNavigation<MainStackNavigationPropsType>();

  useImperativeHandle(ref, () => ({
    open: () => setStartRequestModal(true),
  }));

  const balance = currentSwipe ? FinancingBalances.smeBalance.slice(0, -1) : FinancingBalances.supplierBalance.slice(0, -1);

  const handleExpiryDay = (item: BadgeItemProps) => {
    const currentDay = new Date();
    setCurrentDayItem(item);
    const day = moment(currentDay, 'DD MM YYYY').add(Number(item.day), 'days').format('DD MM YYYY');
    setInputDate(day.toString());
  };

  return (
    <BottomModal
      onReject={() => setStartRequestModal(false)}
      onConfirm={() => {
        navigation.navigate('SME_INVOICES', {
          screen: 'SME_CREATE_REQUEST',
          params: {
            initialPage: 2,
          },
        });
      }}
      confirmTitle="common.start"
      rejectTitle="common.cancel"
      height={heightPixel(475)}
      title="home.start_request"
      closeButton={true}
      isVisible={startRequestModal}
      setIsVisible={setStartRequestModal}
      fixedButtons>
      <Block>
        {/* <CalendarDateSelect /> */}
        <AppInput value={balance} keyboardType="numeric" label="home.amount_to_be_discounted" placeholder="2000₺" />
        <FastSelectDay value={currentDayItem} onSelect={handleExpiryDay} />
        <AppInput
          mt-8
          value={inputDate}
          editable={false}
          onPress={() => setVisibleDateTimePicker(true)}
          label="common.expiry_date"
          placeholder={t('common.expiry_date').toString()}
          icon={ICONS.Calendar}
        />
        <DateTimePicker
          onDateChange={(date: string) => {
            setInputDate(moment(date).format('DD MMMM YYYY'));
          }}
          visible={visibleDateTimePicker}
          setVisible={setVisibleDateTimePicker}
        />
      </Block>
    </BottomModal>
  );
});

export default memo(StartRequestModal);
