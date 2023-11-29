import React, {forwardRef, useImperativeHandle, useState} from 'react';

import moment from 'moment';

import {AppInput, Block, BottomModal, DateTimePicker} from '@/components';
import {ICONS} from '@/utils';

export interface DetailedSearchModalMethods {
  open: () => void;
}

const DetailedSearchModal = forwardRef((props, ref) => {
  const [isVisibleDetailedSearchModal, setVisibleDetailedSearchModal] = useState(false);
  const [isVisibleDate, setIsVisibleDate] = useState(false);
  const [inputDate, setInputDate] = useState('');

  useImperativeHandle(ref, () => ({
    open: () => setVisibleDetailedSearchModal(true),
  }));

  return (
    <BottomModal
      onConfirm={() => {}}
      onReject={() => {}}
      rejectTitle="common.reset"
      confirmTitle="common.filter"
      title={'common.detailed_search'}
      height={524}
      isVisible={isVisibleDetailedSearchModal}
      setIsVisible={setVisibleDetailedSearchModal}
      closeButton>
      <Block flex justify-between>
        <Block>
          <AppInput editable={false} label="common.recipient_name" placeholder="common.select_recipient" icon={ICONS.DownArrow} />
          <AppInput value={inputDate} onPress={() => setIsVisibleDate(true)} editable={false} label="common.invoice_date" placeholder="common.invoice_date" icon={ICONS.DownArrow} />
          <DateTimePicker
            onDateChange={(date: string) => {
              setInputDate(moment(date).format('DD MMMM YYYY'));
            }}
            visible={isVisibleDate}
            setVisible={setIsVisibleDate}
          />
          <AppInput label="common.from_who" placeholder="e-Fatura No, Belge No veya Fatura No" />
          <AppInput label="sme.original_invoice_amount" placeholder="0,00" currency="₺" />
        </Block>
      </Block>
    </BottomModal>
  );
});

export default DetailedSearchModal;
