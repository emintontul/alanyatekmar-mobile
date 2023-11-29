import React, {forwardRef, useImperativeHandle, useState} from 'react';

import {AppFlatList, Block, BottomModal, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';

interface ISortItem {
  title: string;
  id: number;
}

export interface SortModalMethods {
  open: () => void;
}

const SortModal = forwardRef((props, ref) => {
  const [isVisibleSortModal, setVisibleSortModal] = useState(false);
  const [selectSort, setSelectSort] = useState(1);

  const sortTypeData = [
    {id: 1, title: 'filter_actions.recommended_sort'},
    {id: 2, title: 'filter_actions.invoice_date_n'},
    {id: 3, title: 'filter_actions.invoice_date_f'},
    {id: 4, title: 'filter_actions.expiry_date_n'},
    {id: 5, title: 'filter_actions.expiry_date_f'},
    {id: 6, title: 'filter_actions.amount_n'},
    {id: 7, title: 'filter_actions.amount_f'},
  ];

  useImperativeHandle(ref, () => ({
    open: () => setVisibleSortModal(true),
  }));

  const SortItem = ({item}: {item: ISortItem}) => {
    const SortItemBox = useStyledTag(Block, 'borderBottom', () => ({
      borderBottomColor: COLORS.lightGray,
      borderBottomWidth: item.id === 7 ? 0 : 1,
    }));
    const SortItemText = useStyledTag(Text, 'py-14 fs-14', () => ({
      color: selectSort === item.id ? COLORS.gray : COLORS.black,
    }));

    return (
      <SortItemBox
        pressable
        onPress={() => {
          setSelectSort(item.id);
          setVisibleSortModal(false);
        }}>
        <SortItemText>{item.title}</SortItemText>
      </SortItemBox>
    );
  };

  return (
    <BottomModal contentStyle="pt-0" title={'filter_actions.change_sort'} height={466} isVisible={isVisibleSortModal} setIsVisible={setVisibleSortModal} closeButton>
      <AppFlatList contentContainerStyle={{paddingTop: 24}} renderItem={SortItem} data={sortTypeData} />
    </BottomModal>
  );
});

export default SortModal;
