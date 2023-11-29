import React from 'react';

import {AppIcon, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {fontPixel} from '@/utils';

interface IInfoCard {
  title?: string;
  text?: string | number;
  type: 'warning' | 'info' | 'error' | 'success';
  iconRight?: string;
  isVisible: boolean;
  iconLeft?: string;
  onPress?: () => void;
  buttonText?: string;
  onPressText?: () => void;
  amount?: string | number;
  contentStyle?: string;
  iconColor?: string;
  iconSize?: number;
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
    bg: COLORS.successLight,
    text: COLORS.font,
    border: COLORS.success,
  },
};

const InfoCard = (props: IInfoCard) => {
  const {title, text, type, iconRight, iconLeft, iconColor, isVisible, onPress, buttonText, onPressText, amount, contentStyle, iconSize = 24} = props;

  const InfoCardContainer = useStyledTag(Block, 'pressable row middle center justify-between rounded-4 border px-20 ' + contentStyle, () => ({
    backgroundColor: CardColors[type].bg,
    borderColor: CardColors[type].border,
    paddingVertical: title ? 26 : 12,
  }));

  return (
    <Block {...props}>
      {isVisible && (
        <InfoCardContainer pressable onPress={onPress}>
          {iconLeft && <AppIcon size={iconSize ? iconSize : fontPixel(24)} name={iconLeft} color={iconColor ? iconColor : CardColors[type].text} />}
          {title ? (
            <Block justify-between px-12 row flex>
              <Text subtitleThin>{title}</Text>
              <Text title bold primary>
                {text}
              </Text>
            </Block>
          ) : (
            <Block flex px-12>
              <Text sm>{text}</Text>
              {buttonText && (
                <Block pressable py-4 w-120 onPress={onPressText}>
                  <Text tinyInfo medium>
                    {buttonText}
                  </Text>
                </Block>
              )}
            </Block>
          )}
          {amount && (
            <Text fs-18 bold mr-6>
              {amount}
            </Text>
          )}
          {iconRight && (
            <Block>
              <AppIcon size={fontPixel(24)} name={iconRight} color={CardColors[type].text} />
            </Block>
          )}
        </InfoCardContainer>
      )}
    </Block>
  );
};

export default InfoCard;
