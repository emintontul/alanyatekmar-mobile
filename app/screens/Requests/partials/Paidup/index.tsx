import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {RequestBadgeFilterData} from 'data/mock_data';
import {groupBy} from 'lodash';
import {useTranslation} from 'react-i18next';

import {AppFlatList, BadgeFilter, Block, FilterActions, PageTopCard, Text} from '@/components';
import RequestCard from '@/components/App/RequestCard';
import {formatCurrency, ICONS, IRequestCard} from '@/utils';

const PaidInfoContent = ({data}: {data: Array<IRequestCard>}) => {
  const {t} = useTranslation();

  const totalAmountCount = data.reduce((acc: number, curr: IRequestCard) => acc + curr?.TotalPayableAmount, 0);
  const totalInvoiceCount = data.reduce((acc: number, curr: IRequestCard) => acc + curr?.TotalInvoiceCount, 0);

  return (
    <Block ml-12>
      <Text tiny opacity60>
        requests.total_payment_received
      </Text>
      <Text subtitle bold>
        {formatCurrency(totalAmountCount)}
      </Text>
      <Block row center>
        <Text tiny medium>
          {t('requests.success_req', {amount: data?.length})} /
        </Text>
        <Text>{t('requests.invoice', {amount: totalInvoiceCount})}</Text>
      </Block>
    </Block>
  );
};

const Paidup = ({data = []}: {data: Array<IRequestCard>}) => {
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
      <PageTopCard isVisible={true} iconLeft={ICONS.Coins1} type="success" textContent={<PaidInfoContent data={data} />} />
      <BadgeFilter mt-12 filterData={RequestBadgeFilterData} onBadgeChange={onBadgeChange} />
      <ScrollView style={styles.content}>
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

export default Paidup;
