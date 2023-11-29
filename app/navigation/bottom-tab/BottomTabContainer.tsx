import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {BottomTabItem} from './BottomTabItem';
import InvoiceFloatButtons from '../../components/App/InvoiceFloatButtons/index';
import Routes from '../Routes';

import {Block, Shadow} from '@/components';
import {useAppSelector, useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {fontPixel, widthPixel} from '@/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const bottomTabConfig = {
  height: widthPixel(60),
  fontSize: fontPixel(10),
  iconSize: fontPixel(26),
};

const FloatButton = ({onPress, isVisible}: {onPress: () => void; isVisible: boolean}) => {
  return <BottomTabItem isFocused={isVisible} name={Routes.INVOICES_MAIN} onPress={onPress} />;
};

export const BottomTabContainer = (props: BottomTabBarProps) => {
  const bottomTabDisplay = useAppSelector(state => state.settings.bottomTabDisplay);
  const [floatMenu, setFloatMenu] = useState(false);
  const {state, navigation} = props;
  const {colors} = useTheme();

  const insets = useSafeAreaInsets();
  let bottom = insets.bottom != 0 ? insets.bottom - 15 : 0;
  return (
    <Block>
      <InvoiceFloatButtons isVisible={floatMenu} setIsVisible={setFloatMenu} onClose={() => setFloatMenu(!floatMenu)} />
      <Shadow
        md
        >
          <Block style={[
          styles.tab,
          {
            height: bottomTabConfig.height + bottom,
            backgroundColor: colors.bottomTabColor,
          },
        ]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            setFloatMenu(false);
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return route.name === Routes.INVOICES_MAIN ? (
            <FloatButton
              key={index}
              isVisible={floatMenu}
              onPress={() => {
                setFloatMenu(true);
              }}
            />
          ) : (
            <BottomTabItem isFocused={isFocused && !floatMenu} key={index} name={route.name} onPress={onPress} routesLength={state.routes?.length} currentIndex={index}  />
          );
        })}
        </Block>
      </Shadow>
    </Block>
  )
};

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    paddingTop: widthPixel(5),
    left: 0,
    borderTopColor: COLORS.flueGrey,
    borderTopWidth: 2,
    right: 0,
    paddingLeft: widthPixel(16),
    paddingRight: widthPixel(16),
    flexDirection: 'row',
    width: Dimensions.get('window').width,
  },
});
