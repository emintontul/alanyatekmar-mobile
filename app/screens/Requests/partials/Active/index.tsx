import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {RequestBadgeFilterData} from 'data/mock_data';
import {groupBy} from 'lodash';

import {AppFlatList, BadgeFilter, Block, FilterActions, PageTopCard, RequestCard} from '@/components';
import {ICONS, IRequestCard} from '@/utils';

const Active = ({data = []}: {data: Array<IRequestCard>}) => {
  const [listData, setData] = useState(data);
  const grouped = groupBy([...data], 'NotifyBuyer') as never;

  const onBadgeChange = (value: number) => {
    initData(value);
  };

  const initData = (value: number) => {
    setData(value === 3 ? data : grouped[value.toString()]);
  };

  return (
    <Block flex>
      <PageTopCard isVisible iconLeft={ICONS.Clock2} type="info" text="requests.info_message" />
      <BadgeFilter mt-12 filterData={RequestBadgeFilterData} onBadgeChange={onBadgeChange} />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FilterActions />
        <AppFlatList data={listData} renderItem={({item}) => <RequestCard item={item} />} />
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
  },
});

export default Active;
