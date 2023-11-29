import React, {ReactNode} from 'react';

import {AppIcon, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {fontPixel} from '@/utils';

interface IPageTopCard {
  text?: string | number;
  type: 'info' | 'success';
  isVisible: boolean;
  iconLeft?: string;
  onPress?: () => void;
  textContent?: ReactNode;
}

const CardColors = {
  info: {
    bg: COLORS.infoLight,
    iconBg: COLORS.info,
    icon: COLORS.white,
    text: COLORS.info,
    border: COLORS.info,
  },
  success: {
    bg: COLORS.successLight,
    iconBg: COLORS.success,
    icon: COLORS.white,
    text: COLORS.info,
    border: COLORS.success,
  },
};

const PageTopCard = (props: IPageTopCard) => {
  const {text, type, iconLeft, isVisible, textContent} = props;
  const TopPageCardContainer = useStyledTag(Block, 'pressable row center justify-between px-20', () => ({
    backgroundColor: CardColors[type].bg,
    borderWidth: 1,
    borderColor: CardColors[type].bg,
    borderBottomColor: CardColors[type].border,
    paddingVertical: 20,
    minHeight: 76,
  }));
  const IconContainer = useStyledTag(Block, 'center middle w-36 h-36 rounded-4 mt-2', () => ({
    backgroundColor: CardColors[type].iconBg,
  }));

  return (
    <Block {...props}>
      {isVisible && (
        <TopPageCardContainer>
          <Block row middle center>
            <IconContainer>{iconLeft && <AppIcon size={fontPixel(24)} name={iconLeft} color={CardColors[type].icon} />}</IconContainer>
            {text ? (
              <Text flex sm ml-10 fullHeight>
                {text}
              </Text>
            ) : (
              <>{textContent}</>
            )}
          </Block>
        </TopPageCardContainer>
      )}
    </Block>
  );
};

export default PageTopCard;
