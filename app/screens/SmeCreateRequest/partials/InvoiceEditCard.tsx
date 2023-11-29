import React from 'react';

import moment from 'moment';
import {Controller, FieldArrayWithId, UseFormReturn} from 'react-hook-form';

import {images} from '@/assets';
import {AppImage, AppInput, Block, CalendarDateSelect, Text} from '@/components';

interface IInvoiceEditCard {
  item: FieldArrayWithId;
  index: number;
  form: UseFormReturn;
}

export const InvoiceEditCard = ({item, index, form}: IInvoiceEditCard) => {
  return (
    <>
      <Block bg-white p-16 pressable>
        <Block row>
          <AppImage width={28} height={28} url={item.image || images.akbank} rounded-4 />
          <Block ml-12 flex>
            <Block middle>
              <Block row justify-between flex>
                <Text fs-14 semibold>
                  {item?.ReceiverName}
                </Text>
              </Block>

              <Block row pt-2>
                <Text fs-12 info>
                  {item?.InvoiceNumber}
                </Text>
                {item?.IssueDate && <Text fs-12 opacity60>{` / ${moment(item?.IssueDate).format('DD.MM.YYYY')}`}</Text>}
              </Block>

              <Block mt-17>
                <Controller
                  render={({field: {onChange, value}}) => (
                    <CalendarDateSelect
                      onSelect={date => {
                        onChange(date);
                      }}
                      date={value ? moment(value).format('YYYY-MM-DD') : null}
                    />
                  )}
                  name={`allowanceInvoices.${index}.PaymentDueDate`}
                  control={form.control}
                />
                <Controller
                  render={({field: {onChange, value}, fieldState: {error}}) => (
                    <AppInput
                      onChangeText={txt => {
                        if (Number(txt) > item?.RemainingAmount) {
                          form.setError(`allowanceInvoices.${index}.PayableAmount`, {
                            message: 'Girilen tutar iskontolonabalir tutarından fazla olamaz !',
                          });
                        } else {
                          form.clearErrors(`allowanceInvoices.${index}.PayableAmount`);
                        }
                        onChange(Number(txt) || null);
                      }}
                      value={value?.toString()}
                      label="home.amount_to_be_discounted"
                      errorMessage={error?.message}
                      error={error?.message}
                    />
                  )}
                  name={`allowanceInvoices.${index}.PayableAmount`}
                  control={form.control}
                />
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      <Block h-1 bg-gray w-full />
    </>
  );
};
