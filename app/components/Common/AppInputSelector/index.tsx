import React, {useState} from 'react';

import {Controller, UseFormReturn} from 'react-hook-form';

import AppInput from '../AppInput';
import AppSelector, {ItemProp} from '../AppSelector';
import Block from '../Block';

import {IPaymentForm} from '@/screens/Payment/partials/PaymentForm/useForm';
import {ICONS} from '@/utils';

interface Props {
  form: UseFormReturn<IPaymentForm>;
  name: keyof IPaymentForm;
  label?: string;
  placeholder?: string;
  itemsList?: Array<ItemProp>;
}

const AppInputSelector = (props: Props) => {
  const {form, name, label, placeholder, itemsList} = props;
  const [visible, setVisible] = useState(false);
  return (
    <Controller
      name={name}
      control={form?.control}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <Block flex {...props}>
          <AppInput onPress={() => setVisible(true)} value={value as string} onBlur={onBlur} editable={false} label={label} placeholder={placeholder} icon={ICONS.DownArrow} error={error?.message} />
          <AppSelector onClose={() => setVisible(false)} onSelect={onChange} isVisible={visible} itemsList={itemsList || []} />
        </Block>
      )}
    />
  );
};

export default AppInputSelector;
