import React, {forwardRef, Ref, useImperativeHandle, useState} from 'react';

import {AppCheckbox, Block, BottomModal, Text} from '@/components';

export interface IntroModalMethods {
  open: () => void;
}

const IntroModal = (_: unknown, ref: Ref<IntroModalMethods>) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [checked, setChecked] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setIsVisibleModal(true),
  }));

  return (
    <BottomModal
      fixedButtons
      contentStyle="pt-20"
      onConfirm={() => {
        setIsVisibleModal(false);
      }}
      confirmTitle="common.got_it_continue"
      isVisible={isVisibleModal}
      setIsVisible={setIsVisibleModal}
      title="sme.intro_modal_title"
      height={285}>
      <Text tiny opacity60>
        sme.intro_modal_text
      </Text>
      <Block row center mt-34>
        <AppCheckbox checked={checked} onPress={() => setChecked(!checked)} />
        <Text ml-8>common.dont_show_this_again</Text>
      </Block>
    </BottomModal>
  );
};

export default forwardRef(IntroModal);
