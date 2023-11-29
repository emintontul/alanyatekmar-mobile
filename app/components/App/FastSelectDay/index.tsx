import React, {memo} from 'react';

import {useTranslation} from 'react-i18next';

import {AppFlatList, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';

export interface IFastSelectDay {
  onSelect: (item: BadgeItemProps) => void;
  value: BadgeItemProps;
}

export interface BadgeItemProps {
  id: number;
  day: string | number;
}

export const DayBadgeData = [
  {id: 1, day: 15},
  {id: 2, day: 30},
  {id: 3, day: 45},
  {id: 4, day: 60},
  {id: 5, day: 75},
  {id: 6, day: 90},
];

const FastSelectDay = (props: IFastSelectDay) => {
  const {onSelect, value} = props;
  const {t} = useTranslation();

  const DayBadgeItem = ({item}: {item: BadgeItemProps}) => {
    const Badge = useStyledTag(Block, 'border flex mb-4 py-8 rounded-4 mx-2', () => ({
      borderWidth: 1.5,
      borderColor: value?.id === item.id ? COLORS.primary : COLORS.gray,
      backgroundColor: value?.id === item.id ? COLORS.infoLight : 'transparent',
    }));

    const BadgeText = useStyledTag(Text, 'textCenter semibold', () => ({
      color: value?.id === item.id ? COLORS.primary : COLORS.gray,
    }));

    return (
      <Badge
        pressable
        onPress={() => {
          onSelect(item);
        }}>
        <BadgeText>{t('home.term_day_badge', {day: item.day})}</BadgeText>
      </Badge>
    );
  };

  return (
    <Block {...props}>
      <Text medium>home.fast_select_day_title</Text>
      <Block mt-12>
        <AppFlatList scrollEnabled={false} numColumns={3} renderItem={DayBadgeItem} data={DayBadgeData} />
      </Block>
    </Block>
  );
};

export default memo(FastSelectDay);
