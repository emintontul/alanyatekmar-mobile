import React, {memo, ReactNode} from 'react';
import {Animated, Dimensions, Pressable, StyleSheet, Text, TextProps, useWindowDimensions} from 'react-native';

import {useTranslation} from 'react-i18next';
import RenderHTML, {MixedStyleDeclaration} from 'react-native-render-html';
import {RFValue} from 'react-native-responsive-fontsize';

import {useTheme, useTranslate} from '@/hooks';
import {SIZES} from '@/theme';
import {IStyleShortcuts, ITextStyles} from '@/utils';

interface TypographyProps extends TextProps, ITextStyles, IStyleShortcuts {
  children?: string | Array<ReactNode | string> | number | null;
  params?: object;
  animated?: boolean;
  pressable?: boolean;
  translateText?: boolean;
  style?: object;
  innerText?: string | object;
}

const Typography = (props: TypographyProps) => {
  const {children, params, animated, pressable, onPress, translateText, style, innerText, ...rest} = props;
  const {textStyles, styles} = useTheme(props);
  const {width} = useWindowDimensions();
  const {t} = useTranslation();

  // Translations
  const _translate = useTranslate(children as string, params);
  const i18nText = _translate ? _translate : children;

  // Content
  const content = i18nText || '';

  const insideStyles = StyleSheet.flatten([
    {
      fontSize: RFValue(SIZES.font, Dimensions.get('window').height),
    },
  ]);

  if (animated) {
    return (
      <Animated.Text {...rest} style={[insideStyles, textStyles, styles, props.style]}>
        {content}
      </Animated.Text>
    );
  }

  if (pressable) {
    return (
      <Pressable onPress={onPress}>
        <Text {...rest} style={[textStyles, styles, props.style]}>
          {content}
        </Text>
      </Pressable>
    );
  }

  if (translateText) {
    return <RenderHTML tagsStyles={style as Readonly<Record<string, MixedStyleDeclaration>>} contentWidth={width} source={{html: t(`${children}`, innerText as never).toString()}} />;
  }

  return (
    <Text {...rest} style={[textStyles, styles, props.style]}>
      {content}
    </Text>
  );
};

export default memo(Typography);
