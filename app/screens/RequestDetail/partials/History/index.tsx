import React from 'react';

import {RequestsHistory} from 'data/mock_data';
import {groupBy} from 'lodash';
import moment from 'moment';
import {useTranslation} from 'react-i18next';

import {useGetLogsQuery} from '@/api/kingdomApi';
import {AppFlatList, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';

const MessageContainer = (props: {item: {date: string; time: string; message: string}[]}) => {
  const {item} = props;

  const Container = useStyledTag(Block, 'py-16 mr-20', ({id}: {id: number}) => ({
    borderBottomWidth: RequestsHistory?.length === id ? 0 : 1,
    borderColor: COLORS.lightGrayOpacity,
  }));

  return (
    <Container pressable>
      <Block px-20>
        <Text semibold mb-8>
          {item?.[0]?.date}
        </Text>
        {item.map((current, index) => (
          <Block row pt-16 key={index}>
            <Text tiny opacity60>
              {current.time}
            </Text>
            <Text ml-12 tiny>
              {current.message}
            </Text>
          </Block>
        ))}
      </Block>
    </Container>
  );
};

const History = ({itemId}: {itemId: number}) => {
  const {data = {Logs: []}} = useGetLogsQuery(itemId);

  const {t} = useTranslation();

  const getData = () => {
    const temp = [];

    data.Logs.forEach(item => {
      const current = {};
      const date = item.ShortDescription.split(' ')[item.ShortDescription?.split(' ').length - 2];
      const time = item.ShortDescription.split(' ')[item.ShortDescription?.split(' ').length - 1];

      const now = moment(moment.now()).format('DD MMMM YYYY');
      const itemDate = moment(
        date
          .split('.')
          .sort((a: number, b: number) => b - a)
          .join('-'),
      ).format('DD MMMM YYYY');

      current.date = itemDate === now ? t('common.today') : itemDate;
      current.time = time;
      current.message = item.ShortDescription.split(' ').slice(0, -2).join(' ');

      temp.push(current);
    });

    const grouped = groupBy(temp, 'date');
    return Object.keys(grouped).map(item => grouped[item]);
  };

  return (
    <Block flex pb-75>
      <AppFlatList scrollEnabled data={getData()} renderItem={MessageContainer} />
    </Block>
  );
};

export default History;
