import React, {FC} from 'react';

import {useTranslation} from 'react-i18next';

import {BottomTabItemList} from './BottomTabItems';

import {AppIcon, Block, Text} from '@/components';
import {useStyledTag} from '@/hooks';
import {COLORS} from '@/theme';
import {widthPixel} from '@/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  onPress: () => void;
  name: string;
  isFocused: boolean;
  routesLength?: number;
  currentIndex?: number;
};

export const BottomTabItem: FC<Props> = props => {
  const {onPress, name, isFocused} = props;
  const {t} = useTranslation();

  const BottomTab = useStyledTag(Block, 'flex center middle');

  const insets = useSafeAreaInsets();
  return (
    <BottomTab onPress={onPress} pressable >
      {BottomTabItemList.map(
        item =>
          item.name === name && (
            <Block key={item.name} flex center>
              <AppIcon name={item?.icon || ''} size={24} color={isFocused ? COLORS.primary : COLORS.lightGray} />
              <Text md fs-11 mt-5 style={{color: isFocused ? COLORS.primary : COLORS.tabItem}}>
                {t(item.label || '').toString()}
              </Text>
            </Block>
          ),
      )}
    </BottomTab>
  );
};
