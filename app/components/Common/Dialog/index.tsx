/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {BackHandler, Keyboard, Pressable, StyleSheet, Text as T} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {random} from 'lodash';
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from 'react-native-reanimated';

import AppButton from '../AppButton';
import AppIcon from '../AppIcon';
import AppImage from '../AppImage';
import AppInput from '../AppInput';
import Block from '../Block';
import Text from '../Text';

import {images} from '@/assets';
import {useTheme} from '@/hooks';
import {COLORS} from '@/theme';
import {DialogAction, DialogProps, ICONS, widthPixel} from '@/utils';

export default function Alert({route}: any) {
  const navigation: StackNavigationProp<never> = useNavigation();

  const theme = useTheme();
  const {title = '', type, message, action, option, position, alertType, placeholder} = route?.params as DialogProps;

  const [promptText, setPromptText] = useState<string>('');

  //#region Animation
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    if (position === 'bottom') {
      return {
        bottom: offset.value,
      };
    } else if (position === 'left') {
      return {
        flex: 1,
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: offset.value - 50,
      };
    } else if (position === 'right') {
      return {
        flex: 1,
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        right: offset.value - 50,
      };
    } else {
      return {
        top: offset.value,
      };
    }
  });
  //#endregion

  //#region BackHandler
  useEffect(() => {
    const backAction = () => {
      navigation.canGoBack() && navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  //#endregion

  //#region Action Button
  const AcionButton = ({item}: {item: DialogAction}) => {
    return (
      <T>
        <AppButton
          px-16
          h-48
          width={widthPixel(295)}
          type={item.style === 'confirm' ? 'primary' : 'secondary'}
          onPress={() => {
            if (alertType === 'prompt') {
              if (item.style === 'confirm') {
                if (promptText?.length > 0 && option?.cancelable) {
                  Keyboard.dismiss();
                  item?.onPress?.(promptText);
                  navigation.goBack();
                }
              } else {
                item?.onPress?.();
                if (option?.cancelable) {
                  navigation.goBack();
                }
              }
            } else {
              item?.onPress?.();
              if (option?.cancelable) {
                navigation.goBack();
              }
            }
          }}
          title={item?.text}
          titleColor={item.style === 'confirm' ? COLORS.white : COLORS.gray}
        />
      </T>
    );
  };
  //#endregion

  useEffect(() => {
    offset.value = withSpring(50);
    return () => {
      offset.value = 0;
    };
  }, [offset]);

  const useGetImage = () => {
    if (type === 'calendar_warning') {
      return images.calendarWarning;
    }
    return images.success;
  };

  return (
    <React.Fragment>
      {option?.backgroundClose && <Pressable style={styles.bg} onPress={() => navigation.goBack()} />}

      <Animated.View style={[styles.contain, animatedStyles]}>
        <Block style={[styles.content, {backgroundColor: theme.colors.cardBg}]} pb-20>
          <Block>
            <Block borderBottom row justify-between>
              <Text />
              <Block
                pressable
                onPress={() => {
                  navigation.goBack();
                }}
                py-18
                px-20>
                <AppIcon name={ICONS.Close} size={18} color={COLORS.gray} />
              </Block>
            </Block>
            <Block center middle py-32>
              <AppImage url={useGetImage()} width={60} height={70} />
              <Text textCenter pt-24 pb-8 semibold>
                {title}
              </Text>
              <Text textCenter defaultGray>
                {message}
              </Text>
            </Block>
          </Block>
          {alertType === 'prompt' && (
            <Block bg-lightGrey py-10 px-15>
              <AppInput placeholder={placeholder} value={promptText} onChangeText={(text: string) => setPromptText(text)} />
            </Block>
          )}

          {action?.map(item => (
            <Block key={`${random(1000)}_action_button`} style={styles.contentButton}>
              <AcionButton item={item} />
            </Block>
          ))}
        </Block>
      </Animated.View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: '100%',
    zIndex: -2,
  },
  contain: {
    zIndex: 9999,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
  },
  content: {
    width: '90%',
    borderRadius: 4,
  },
  contentButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
});
