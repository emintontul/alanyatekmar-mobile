import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';

import BottomModal from '../../BottomModal';

import {Text} from '@/components/Common';

export interface InvoiceNotAcceptedModalMethods {
  open: () => void;
}

const InvoiceNotAcceptedModal = forwardRef((props, ref: Ref<InvoiceNotAcceptedModalMethods>) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
  }));

  return (
    <BottomModal fixedButtons onConfirm={() => {}} height={242} title="sme.invoice_not_accepted_title" confirmTitle="common.ok" isVisible={isVisible} setIsVisible={setIsVisible}>
      <Text tiny opacity60>
        sme.invoice_not_accepted_text
      </Text>
    </BottomModal>
  );
});

export default InvoiceNotAcceptedModal;
