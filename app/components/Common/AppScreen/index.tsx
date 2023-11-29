import React, {memo, ReactNode} from 'react';
import {ActivityIndicator, Keyboard, Pressable, SafeAreaView, ScrollView, View, ViewStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Portal} from 'react-native-portalize';

import layout from '../../../config/layout.json';
import {Header} from '../../../navigation/components/DefaultHeader';
import {IStyleShortcuts} from '../../../utils/infrastructure/interfaces';
import {getStyleShortcuts} from '../../../utils/style-shortcuts';

import {AppLoader, Block, Text} from '@/components';
import {useTheme} from '@/hooks';
import {bottomTabHeight, COLORS, window} from '@/theme';
import {heightPixel, UseThemeType} from '@/utils';

interface Props extends IStyleShortcuts {
  scroll?: boolean;
  safe?: boolean;
  keyboardScroll?: boolean;
  customStyle?: ViewStyle;
  navigationOptions?: StackNavigationOptions;
  flatList?: boolean;
  children: ReactNode;
  loading?: boolean;
  disableBottom?: boolean;
  barStyle: 'light-content' | 'dark-content';
}

function AppScreen(props: Props) {
  const {children, scroll, safe, keyboardScroll, customStyle, disableBottom, navigationOptions, barStyle, flatList, loading} = props;
  const navigation = useNavigation();
  const {colors} = useTheme();
  const screenProps = props as UseThemeType;

  const screenCommonStyles = {
    padding: heightPixel(window.offset),
    paddingBottom: layout.menu === 'bottom' && !disableBottom ? heightPixel(bottomTabHeight) : heightPixel(20),
    flex: 1,
    backgroundColor: colors.screenBgColor,
    ...customStyle,
  };

  return (
    <>
      <AppLoader loading={loading || false} />
      <Header navigationOptions={navigationOptions} navigation={navigation} barStyle={barStyle} />
      <>
        {scroll && safe && !keyboardScroll && (
          <ScrollView style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <Pressable
              onPress={() => Keyboard.dismiss()}
              style={[
                {
                  paddingBottom: layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                },
              ]}>
              <SafeAreaView>{children}</SafeAreaView>
            </Pressable>
          </ScrollView>
        )}
        {scroll && !safe && (
          <ScrollView style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                minHeight: '100%',
              }}
              onPress={() => Keyboard.dismiss()}>
              <View
                style={[
                  {
                    paddingBottom: layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                  },
                ]}>
                {children}
              </View>
            </Pressable>
          </ScrollView>
        )}
        {!scroll && safe && !keyboardScroll && (
          <SafeAreaView style={{flex: 1}}>
            <Pressable
              style={[
                {
                  ...screenCommonStyles,
                  flex: 1,
                },

                {...getStyleShortcuts(screenProps)},
              ]}
              onPress={() => Keyboard.dismiss()}>
              {children}
            </Pressable>
          </SafeAreaView>
        )}
        {keyboardScroll && !safe && (
          <KeyboardAwareScrollView
            style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scroll}
            bounces={false}
            contentContainerStyle={{...getStyleShortcuts(screenProps)}}>
            <Pressable
              style={{
                minHeight: '100%',
              }}
              onPress={() => Keyboard.dismiss()}>
              <View
                style={[
                  {
                    paddingBottom: layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                  },
                  getStyleShortcuts(screenProps),
                ]}>
                {children}
              </View>
            </Pressable>
          </KeyboardAwareScrollView>
        )}
        {keyboardScroll && safe && (
          <KeyboardAwareScrollView
            style={{...screenCommonStyles, ...getStyleShortcuts(screenProps)}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={scroll}
            bounces={false}
            contentContainerStyle={{...getStyleShortcuts(screenProps)}}>
            <SafeAreaView>
              <Pressable
                style={{
                  minHeight: '100%',
                }}
                onPress={() => Keyboard.dismiss()}>
                <View
                  style={[
                    {
                      paddingBottom: layout.menu === 'bottom' ? bottomTabHeight + 20 : 50,
                    },
                    getStyleShortcuts(screenProps),
                  ]}>
                  {children}
                </View>
              </Pressable>
            </SafeAreaView>
          </KeyboardAwareScrollView>
        )}
        {!scroll && !safe && !keyboardScroll && !flatList && (
          <Block pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
            <View
              style={[
                {
                  ...screenCommonStyles,
                  flex: 1,
                },
                {...getStyleShortcuts(screenProps)},
              ]}>
              {children}
            </View>
          </Block>
        )}
        {flatList && (
          <View
            style={[
              {
                ...screenCommonStyles,
                flex: 1,
              },
              {...getStyleShortcuts(screenProps)},
            ]}>
            {children}
          </View>
        )}
      </>
    </>
  );
}

export default memo(AppScreen);
