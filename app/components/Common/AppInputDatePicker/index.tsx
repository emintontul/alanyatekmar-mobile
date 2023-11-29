import React, {useState} from 'react';

import moment from 'moment';
import {Controller, UseFormReturn} from 'react-hook-form';

import AppInput from '../AppInput';
import Block from '../Block';
import DateTimePicker from '../DateTimePicker';

import {IPaymentForm} from '@/screens/Payment/partials/PaymentForm/useForm';
import {ICONS} from '@/utils';

interface Props {
  form: UseFormReturn<IPaymentForm>;
  name: keyof IPaymentForm;
}

const AppInputDatePicker = (props: Props) => {
  const {form, name} = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <Block {...props}>
          <AppInput value={value as string} onBlur={onBlur} editable={false} onPress={() => setIsVisible(true)} label="payment.payment_receipt_date" icon={ICONS.MiniCalendar} error={error?.message} />
          <DateTimePicker visible={isVisible} setVisible={setIsVisible} onDateChange={(date: string) => onChange(moment(date)?.format('DD MMMM YYYY'))} />
        </Block>
      )}
    />
  );
};

export default AppInputDatePicker;
