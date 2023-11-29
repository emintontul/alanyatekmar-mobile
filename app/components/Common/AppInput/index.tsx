/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, LegacyRef, memo, ReactNode, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import styles from './style';
import AppIcon from '../AppIcon';
import Block from '../Block';
import Text from '../Text';

import { useTheme } from '@/hooks';
import { COLORS, FONTS } from '@/theme';
import { heightPixel, ICONS } from '@/utils';

const inputHeight = heightPixel(48);
const offsetHeight = inputHeight / 3.9;

interface AppInputProps extends TextInputProps {
  placeholder?: string | undefined;
  onChangeText?: (text: string) => void;
  handleBlur?: (e: Event) => void;
  onFocus?: (e: Event) => void;
  errorMessage?: string;
  animatedPlaceholder?: string;
  icon?: string | ReactNode;
  label?: string;
  form?: UseFormReturn;
  name?: string;
  error?: boolean | string;
  onPress?: () => void;
  onClear?: () => void;
  reference?: LegacyRef<TextInput>;
  inputProps?: object;
  skipNext?: boolean;
  disabled?: boolean;
  onIconPress?: () => void;
  type?: 'password' | 'text' | 'currency' | 'card';
  currency?: string | null;
  maxLength?: number;
  keyboard?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

const { format: formatCurrency } = Intl.NumberFormat('tr-TR', {
  currency: 'TRY',
  style: 'currency',
});

const useCurrencyInput = (initialValue: string | undefined) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    handleChange(initialValue + '00');
  }, []);

  const handleChange = (v: string) => {
    const decimal = Number(v.replace(/\D/g, '')) / 100;
    setValue(
      formatCurrency(decimal || 0)
        .split('₺')[1]
        .replace('R$\xa0', ''),
    );
  };
  return [value, handleChange] as [string, (v: string) => void];
};

const useCreditCardInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (v: string) => {
    const cardValue = v.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    if (cardValue) {
      const test = !cardValue[2] ? cardValue[1] : `${cardValue[1]} ${cardValue[2]}${`${cardValue[3] ? ` ${cardValue[3]}` : ''}`}${`${cardValue[4] ? ` ${cardValue[4]}` : ''}`}`;
      setValue(test.toString());
    }
  };
  return [value, handleChange] as [string, (v: string) => void];
};

const AppInput: FC<AppInputProps> = props => {
  const {
    returnKeyType,
    placeholder,
    onChangeText,
    value,
    error,
    onPress,
    onClear,
    handleBlur,
    animatedPlaceholder,
    icon,
    onFocus,
    editable = true,
    reference,
    form,
    name,
    label,
    skipNext = false,
    type,
    currency,
    maxLength,
    autoCapitalize,
    textContentType,
    autoComplete,
    keyboard

  } = props;
  const { t } = useTranslation();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const offset = useSharedValue(offsetHeight);
  const scale = useSharedValue(1);
  const [text, setText] = useState('');
  const { colors } = useTheme();
  const theme = useTheme();

  const [currencyValue, setCurrencyValue] = useCurrencyInput(value);
  const [cardValue, setCardValue] = useCreditCardInput(value);

  const onIconPress = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };

  const onAnimation = useCallback(
    ({ _offset, _scale }: { _offset: number; _scale: number }) => {
      const timingConfig = {
        duration: 500,
        easing: Easing.out(Easing.exp),
      };
      offset.value = withTiming(_offset, timingConfig);
      scale.value = withTiming(_scale, timingConfig);
    },
    [offset, scale],
  );

  useEffect(() => {
    if (value) {
      onAnimation({ _offset: 5, _scale: 0.75 });
    }
  }, [editable, onAnimation, value]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  });

  const animatedStylesText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onBlur = (e: Event) => {
    handleBlur && handleBlur(e);
    if (!text) {
      onAnimation({ _offset: offsetHeight, _scale: 1 });
    }
  };

  const onChange = (textValue: string) => {
    let txt = textValue;

    setText(textValue);

    if (type === 'currency') {
      setCurrencyValue?.(textValue);
      txt = textValue.split(',').join('');
      txt = txt.substring(0, txt.length - 2);
    }
    if (type === 'card') {
      setCardValue?.(textValue);
      txt = textValue.split('').join('');
      txt = txt.substring(0, txt.length - 2);
    }

    onChangeText && onChangeText(txt);
  };

  const goToNextInput = () => {
    const values = Object.keys(form ? form?.getValues() : {});
    const currentIndex = values.indexOf(name || '');
    const nextInput = values?.[currentIndex + 1];

    if (text) {
      onAnimation({ _offset: 5, _scale: 0.75 });
    }
    nextInput && form && form.setFocus(nextInput);
  };

  const getValue = () => {
    switch (type) {
      case 'currency':
        return currencyValue;
      case 'card':
        return cardValue;
      default:
        return value;
    }
  };

  return (
    <Block {...props}>
      {label && <Text tinyGray>{label}</Text>}
      <Block>
        <Block
          sm
          style={[
            styles.container,
            {
              backgroundColor: colors.inputBg,
              borderWidth: error ? 0.5 : 2,
              borderRadius: 12,
              borderColor: error ? theme.colors.error : COLORS.stroke,
            },
          ]}>
          <Block row center h-48>
            <Block flex relative style={{ height: inputHeight }}>
              {onPress && (
                <Block
                  pressable
                  onPress={() => {
                    onPress && onPress();
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: 99,
                    left: 0,
                    top: 0,
                    bottom: 0,
                    right: 0
                  }}
                />
              )}
              <Block >
                <Animated.View style={[{ position: 'absolute' }, animatedStyles]}>
                  <Animated.View
                    style={[
                      animatedStylesText,
                      {
                        flex: 1,
                      },
                    ]}>
                    <Animated.Text
                      style={[
                        style.animatedPlaceholderStyle,
                        {
                          backgroundColor: colors.inputBg,
                        },
                      ]}>
                      {animatedPlaceholder}
                    </Animated.Text>
                  </Animated.View>
                </Animated.View>

                <TextInput
                  ref={reference}
                  onFocus={(e: Event) => {
                    onFocus ? onFocus(e) : onAnimation({ _offset: 5, _scale: 0.75 });
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder={placeholder && t(placeholder).toString()}
                  editable={editable}
                  placeholderTextColor={colors.gray}
                  style={[
                    styles.input,
                    {
                      bottom: animatedPlaceholder ? -(inputHeight / 8) : 0,
                      height: inputHeight,
                      color: error ? theme.colors.error : colors.inputText,
                    },
                  ]}
                  allowFontScaling={false}
                  value={getValue()}
                  secureTextEntry={props.secureTextEntry || (type === 'password' && !isVisiblePassword)}
                  returnKeyType={returnKeyType}
                  maxLength={maxLength}
                  autoCapitalize={autoCapitalize}
                  autoComplete={autoComplete}
                  keyboard={keyboard}
                  textContentType={textContentType}
                  onSubmitEditing={() => {
                    skipNext && goToNextInput();
                  }}
                />
              </Block>
            </Block>
            <Block h-48 center middle>
              {onClear && value && (
                <Block
                  pressable
                  onPress={() => {
                    onClear();
                    onAnimation({ _offset: offsetHeight, _scale: 1 });
                  }}
                  center
                  middle
                  p-7>
                  <AppIcon name={ICONS.Close} size={18} color={COLORS.lightGray} />
                </Block>
              )}
            </Block>
            {icon && (
              <Block center middle pressable onPress={onIconPress}>
                <AppIcon name={icon as string} size={24} color={COLORS.gray} />
              </Block>
            )}
            {type === 'password' && (
              <Block center middle pressable onPress={onIconPress}>
                <AppIcon name={!isVisiblePassword ? ICONS.eye : ICONS.eyeSlash} size={24} color={COLORS.gray} />
              </Block>
            )}
          </Block>
          {currency && (
            <Block style={style.currencyBox}>
              <Text fs-18 defaultGray>
                {currency}
              </Text>
            </Block>
          )}
        </Block>
        {error && (
          <Block>
            <Text sm error>
              * {error}
            </Text>
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default memo(AppInput);

const style = StyleSheet.create({
  currencyBox: {
    position: 'absolute',
    borderLeftWidth: 1,
    right: 0,
    width: 44,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderColor: COLORS.lightGray,
    backgroundColor: '#F8FAFC',
  },
  animatedPlaceholderStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 100,
    fontFamily: FONTS.medium,
    color: '#ACACAC',
  },
});
