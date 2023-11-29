import React, {memo, RefObject, useEffect, useState} from 'react';

import {yupResolver} from '@hookform/resolvers/yup';
import {FieldValues, useFieldArray, useForm, UseFormReturn} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as yup from 'yup';

import {InvoiceEditCard} from './InvoiceEditCard';

import {AppButton, Block, InfoCard, Shadow, Text} from '@/components';
import {useAppDispatch, useAppSelector, useStyledTag} from '@/hooks';
import {requestRedux, RootState} from '@/store';
import {formatCurrency, HorizontalStepperMethods, ICONS, IFinancementInvoices} from '@/utils';

interface ExpiryAndAmountEditFooterProps {
  fields: IFinancementInvoices[] | undefined;
  onSubmit: (values: FieldValues[]) => void;
  form: UseFormReturn;
}

const ExpiryAndAmountEditFooter = ({fields = [], onSubmit, form}: ExpiryAndAmountEditFooterProps) => {
  const [totalAmount, setTotalAmount] = useState(fields.reduce((a: number, c: IFinancementInvoices) => a + c.PayableAmount, 0));

  const {watch} = form;

  useEffect(() => {
    const subscription = watch((value: {allowanceInvoices: IFinancementInvoices[]}) => {
      setTotalAmount(value?.allowanceInvoices?.reduce((a: number, c) => a + Number(c.PayableAmount), 0));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Block absolute bottom-0 left-0 right-0 h-102 bg-white center px-18>
      <Block row>
        <Text bold pt-12>
          {fields.length} <Text defaultGray>common.invoice</Text> : {formatCurrency(totalAmount)}
        </Text>
      </Block>

      <AppButton onPress={onSubmit} mt-8 h-47 type="primary" title="common.continue" />
    </Block>
  );
};

const ExpiryAndAmountEdit = ({stepper}: {stepper: RefObject<HorizontalStepperMethods>}) => {
  const allowanceInvoices = useAppSelector((state: RootState) => state.requestRedux.createRequestBody.allowanceInvoices);
  const dispatch = useAppDispatch();
  const Divider = useStyledTag(Block, 'w-full mt-16 mb-12', () => ({borderBottomWidth: 1, opacity: 0.08}));
  const {t} = useTranslation();

  const schema = yup.object().shape({
    allowanceInvoices: yup.array().of(
      yup.object({
        InvoiceId: yup.number().nullable(),
        PayableAmount: yup.mixed().required(t('validations.required').toString()),
        PayableAmountCurrency: yup.string(),
        KdvRate: yup.number().nullable(),
        PaymentDueDate: yup.string().nullable(),
      }),
    ),
  });

  const form = useForm({defaultValues: {allowanceInvoices}, resolver: yupResolver(schema)});

  const {fields} = useFieldArray({
    control: form.control,
    name: 'allowanceInvoices',
  });

  const onSubmit = (values: IFinancementInvoices) => {
    stepper.current && stepper.current.next();
    dispatch(requestRedux.setAllowenceInvoices({invoices: values}));
  };

  return (
    <Block flex>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Block pressable>
          <Block px-20>
            <Text title mb-8 mt-24>
              create_sme.step_1_title
            </Text>
            <Text tiny opacity60>
              create_sme.step_1_subtitle
            </Text>
            <InfoCard contentStyle="px-12 align-start" mt-12 isVisible={true} type={'warning'} iconLeft={ICONS.LightInfo} text={'create_sme.step_1_info_text'} />
          </Block>
          <Divider />
          <Block px-20>
            <Shadow>
              <Block rounded-4 pb-120 overflow>
                {fields?.map((item, index: number) => (
                  <InvoiceEditCard form={form} index={index} item={item} key={index} />
                ))}
              </Block>
            </Shadow>
          </Block>
        </Block>
      </KeyboardAwareScrollView>

      <ExpiryAndAmountEditFooter fields={fields} onSubmit={form.handleSubmit(onSubmit)} form={form} />
    </Block>
  );
};

export default memo(ExpiryAndAmountEdit);
