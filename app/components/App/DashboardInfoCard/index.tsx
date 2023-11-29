import React from 'react';
import {GestureResponderEvent} from 'react-native';

import {AppIcon, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';

interface IDashboardInfoCard {
  title: string;
  text?: string;
  type: 'warning' | 'error' | 'info' | 'success';
  icon: string;
  amount: number;
  onPress?: (event: GestureResponderEvent) => void | undefined;
}

const CardColors = {
  warning: {
    bg: COLORS.warningLight,
    text: COLORS.warning,
    border: COLORS.warning,
  },
  error: {
    bg: COLORS.errorLight,
    text: COLORS.error,
    border: COLORS.error,
  },
  info: {
    bg: COLORS.infoLight,
    text: COLORS.info,
    border: COLORS.info,
  },
  success: {
    bg: COLORS.bgGray,
    text: COLORS.gray,
    border: COLORS.gray,
  },
};

const DashboardInfoCard = (props: IDashboardInfoCard) => {
  const {title, type, icon, text, amount, ...rest} = props;

  const DashboardInfoCardContainer = useStyledTag(Block, 'pressable w-163 justify-between h-142 bg-infoLight rounded-5 p-18', () => ({
    backgroundColor: CardColors[type].bg,
    borderColor: CardColors[type].border,
  }));

  const WarningMessage = useStyledTag(Text, 'textRight tinyError', () => ({
    color: CardColors[type].text,
  }));

  return (
    <DashboardInfoCardContainer pressable {...rest}>
      <React.Fragment>
        <Block row justify-between>
          <Text subtitleThin>{title}</Text>
          <AppIcon name={icon} color={CardColors[type].text} size={24} />
        </Block>
        <Block row justify-between align-end>
          <Text bigTitle>{amount}</Text>
          {text && <WarningMessage>{text}</WarningMessage>}
        </Block>
      </React.Fragment>
    </DashboardInfoCardContainer>
  );
};

export default DashboardInfoCard;
