import React from 'react';

import moment from 'moment';
import {Controller, UseFormReturn} from 'react-hook-form';

import {IPaymentForm} from './useForm';

import {AppCheckbox, AppInput, AppInputDatePicker, AppInputSelector, Block, Text} from '@/components';

const PaymentForm = ({form}: {form: UseFormReturn<IPaymentForm>}) => {
  const months = Array.from({length: 13})
    .map((_, item) => ({title: item.toString().length === 1 ? `0${item}` : item, value: item.toString().length === 1 ? `0${item}` : String(item)}))
    .slice(1);

  const years = Array.from({length: 15})
    .map((_, index) => ({title: Number(moment().get('year') + index - 1), value: String(Number(moment().get('year') + index))}))
    .slice(1);

  return (
    <Block>
      <Controller
        control={form?.control}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <AppInput type="card" maxLength={19} mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'payment.card_no'} placeholder={'**** **** **** 4444'} error={error?.message} />
        )}
        name={'cardNo'}
      />
      <AppInputDatePicker name={'paymentReceiptDate'} form={form} />
      <Controller
        control={form?.control}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <AppInput mb-6 value={value} onChangeText={onChange} onBlur={onBlur} label={'payment.card_name'} placeholder="payment.card_name_placeholder" error={error?.message} />
        )}
        name={'fullname'}
      />
      <Block row justify-between>
        <AppInputSelector mr-7 name={'month'} form={form} label="Ay" placeholder="Ay" itemsList={months} />
        <AppInputSelector name={'year'} form={form} label="Yıl" placeholder="Yıl" itemsList={years} />
      </Block>
      <Controller
        control={form?.control}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <AppInput maxLength={3} mb-6 col-6 value={value} label={'CVV'} placeholder="***" onChangeText={onChange} onBlur={onBlur} error={error?.message} />
        )}
        name={'cvv'}
      />
      <Controller
        control={form?.control}
        render={({field: {onChange, value}}) => (
          <Block row mt-20>
            <AppCheckbox mt-4 checked={value} onPress={() => onChange(!value)} />
            <Text flex tiny black ml-12>
              Kredi/banka kartımın PCI DSS uyumlu altyapıda; ödeme kuruluşu tarafından saklanmasına ve bir sonraki işlemde otomatik olarak görüntülenmesine onay veriyorum.
            </Text>
          </Block>
        )}
        name={'isCheck'}
      />
    </Block>
  );
};

export default PaymentForm;
