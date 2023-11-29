import React, {FC, useLayoutEffect} from 'react';
import {StatusBar} from 'react-native';

import {AppButton, AppIcon} from '@/components';
import {useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {fontPixel, ICONS} from '@/utils';

const BackButton = ({props, navigation}: any) =>
  props.canGoBack && <AppButton w-58 h-40 type="icon" icon={<AppIcon name={ICONS.LongLeftArrow} size={24} color={COLORS.gray} />} onPress={() => navigation.goBack()} />;

export const Header: FC<any> = ({navigationOptions, navigation, barStyle}) => {
  const {colors} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primaryDark,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTitleStyle: {
        fontSize: fontPixel(14),
        color: colors.headerColor,
        
        opacity: 0.9,
      },
      headerTitleAlign: 'center',

      headerLeft: (props: any) => <BackButton props={props} navigation={navigation} />,
      ...navigationOptions,
    });
  }, [navigation, colors, navigationOptions]);

  return (
    <>
      <StatusBar backgroundColor={COLORS.white} barStyle={barStyle} />
    </>
  );
};
