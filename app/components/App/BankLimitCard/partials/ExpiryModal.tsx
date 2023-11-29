import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';

import {BottomModal, Text} from '@/components';

export interface ExpiryModalMethods {
  open: () => void;
}

const ExpiryModal = forwardRef((props, ref: Ref<ExpiryModalMethods>) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisible(true),
  }));

  return (
    <BottomModal fixedButtons contentStyle="pt-20" title="Vade" height={242} onConfirm={() => {}} confirmTitle="Anladım" isVisible={isVisible} setIsVisible={setIsVisible}>
      <Text tiny opacity60>
        Faturalarınızın ortalama vadesi hesaplanır, vadesi olmayan faturalarınıza bugünden itibaren 60 günlük vade sunulur.
      </Text>
    </BottomModal>
  );
});

export default ExpiryModal;
