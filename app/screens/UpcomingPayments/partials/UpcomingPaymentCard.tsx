import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {AppIcon, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {MainStackNavigationPropsType} from '@/navigation/stacks/MainStack/types';
import {COLORS} from '@/theme';
import {CardStyle, ICONS, IPayment, ReturnType} from '@/utils';

const CardStyles: CardStyle = {
  late: {
    bg: {
      backgroundColor: COLORS.errorLight,
      color: COLORS.error,
      borderColor: COLORS.error,
      borderWidth: 1.4,
    },
    text: {
      fontWeight: '600',
      color: COLORS.error,
    },
    icon: {
      backgroundColor: COLORS.error,
      marginRight: 12,
      display: 'flex',
    },
  },
  today: {
    bg: {
      backgroundColor: COLORS.warningLight,
      color: COLORS.warning,
      borderColor: COLORS.warning,
      borderWidth: 1.4,
    },
    text: {
      fontWeight: '600',
      color: COLORS.warning,
    },
    icon: {
      backgroundColor: COLORS.warning,
      marginRight: 12,
      display: 'flex',
    },
  },
  normal: {
    bg: {
      backgroundColor: COLORS.bgGray,
      color: COLORS.warning,
      borderColor: COLORS.warning,
    },
    text: {
      fontWeight: '400',
      color: COLORS.gray,
      fontSize: 12,
    },
    icon: {
      backgroundColor: COLORS.bgGray,
      display: 'none',
    },
  },
};

const type = (item: IPayment): ReturnType => {
  if (item.remainingDays > 1) {
    return CardStyles.normal;
  }
  if (item.remainingDays === 1) {
    return CardStyles.today;
  }
  if (item.remainingDays === 0) {
    return CardStyles.late;
  }

  return {
    text: {},
    bg: {},
    icon: {},
  };
};

interface UpcomingPaymentCardProps {
  item: IPayment;
}

export const UpcomingPaymentCard = ({item}: UpcomingPaymentCardProps) => {
  const CardContainer = useStyledTag(Block, 'h-66 rounded-5 row mb-12 px-16 py-17 center', () => type(item).bg);
  const CardIcon = useStyledTag(Block, 'w-32 h-32 rounded-6 center middle', () => type(item).icon);
  const CardTitle = useStyledTag(Text, 'mb-3 ', () => type(item)?.text);
  const InvoiceCode = useStyledTag(Text, 'sm opacity40 underline');

  const navigation = useNavigation<MainStackNavigationPropsType>();

  return (
    <CardContainer>
      <CardIcon>
        <AppIcon name={ICONS.ErrorMessage} size={22} color={COLORS.white} />
      </CardIcon>
      <Block flex>
        <Block row justify-between>
          <CardTitle>{item.title}</CardTitle>
          <InvoiceCode
            pressable
            onPress={() => {
              navigation.push('REQUEST_DETAIL', {requestNo: item?.code, status: 2});
            }}>
            {item.code}
          </InvoiceCode>
        </Block>
        <Text buttonTitle>{item.amount}</Text>
      </Block>
    </CardContainer>
  );
};
