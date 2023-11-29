import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {AppIcon, Block, Text} from '@/components/Common';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {widthPixel} from '@/utils';

interface FilterDataProps {
  id: number;
  title: string;
  icon?: string;
  amount?: number | undefined;
  iconColor?: string | undefined;
}

interface BadgeFilter {
  filterData: Array<FilterDataProps>;
  onBadgeChange?: (value: number) => void;
}

const BadgeFilter = (props: BadgeFilter) => {
  const [selectedBadge, setSelectedBadge] = useState<number>(3);
  const {filterData, onBadgeChange, ...rest} = props;

  const Badge = useStyledTag(Block, 'row center border py-8 px-16 mr-6 rounded-4', ({item}: {item?: FilterDataProps}) => ({
    borderWidth: 1.5,
    backgroundColor: item?.id === selectedBadge ? COLORS.infoLight : 'transparent',
    borderColor: item?.id === selectedBadge ? COLORS.info : COLORS.gray,
  }));

  const BadgeTitle = useStyledTag(Text, 'center', ({item}: {item?: FilterDataProps}) => ({
    marginLeft: item?.icon && 8,
    color: item?.id === selectedBadge ? COLORS.primary : COLORS.gray,
  }));

  return (
    <Block {...rest}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
        {filterData.map((item, index) => (
          <Badge
            pressable
            onPress={() => {
              setSelectedBadge(item?.id);
              setTimeout(() => {
                onBadgeChange && onBadgeChange(item?.id);
              }, 50);
            }}
            key={index}
            item={item}>
            {item.icon && <AppIcon name={item.icon} color={item.iconColor} />}
            <BadgeTitle item={item}>{item.title}</BadgeTitle>
            <BadgeTitle item={item}>{item.amount}</BadgeTitle>
          </Badge>
        ))}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: widthPixel(20),
  },
});

export default BadgeFilter;
