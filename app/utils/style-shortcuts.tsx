import {StyleProp, ViewProps} from 'react-native';

import {IStyles} from './infrastructure/interfaces';
import {UseThemeType} from './infrastructure/types';
import rgba from './rgba';
import {setupSizes} from './style/size';

import {COLORS, FONTS, themeColors, window} from '@/theme';
import {fontPixel, heightPixel, widthPixel} from '@/utils';

export const getStyles = (t: 'light' | 'dark') => {
  const colors = themeColors[t || 'light'];
  const styles = {
    shortcutStyles: {},
    predefinedStyles: {
      'mt-auto': {
        marginTop: 'auto',
      },
      'mb-auto': {
        marginBottom: 'auto',
      },
      'mr-auto': {
        marginRight: 'auto',
      },
      'ml-auto': {
        marginLeft: 'auto',
      },
      'm-auto': {
        margin: 'auto',
      },
      'bg-primary': {
        backgroundColor: colors.primary,
      },
      'bg-primary-light': {
        backgroundColor: colors.primaryLight,
      },
      'bg-gray': {
        backgroundColor: colors.bgGray,
      },
      'bg-primary-lighter': {
        backgroundColor: colors.primaryLighter,
      },
      'bg-dark': {
        backgroundColor: colors.primaryDark,
      },
      'bg-info': {
        backgroundColor: colors.info,
      },
      'bg-infoLight': {
        backgroundColor: colors.infoLight,
      },
      'bg-warning': {
        backgroundColor: colors.warning,
      },
      'bg-light': {
        backgroundColor: colors.font,
        opacity: 0.08,
      },
      'bg-warningLight': {
        backgroundColor: colors.warningLight,
      },
      'bg-success': {
        backgroundColor: colors.success,
      },
      'bg-card': {
        backgroundColor: colors.cardBg,
      },
      'bg-white': {
        backgroundColor: colors.white,
      },
      'bg-yellow': {
        backgroundColor: colors.yellow,
      },
      'bg-darkGray': {
        backgroundColor: colors.gray,
      },
      'border-gray': {
        borderColor: colors.gray,
      },
      'border-lightGray': {
        borderColor: colors.lightGrayOpacity,
      },
      info: {
        color: COLORS.info,
      },
      px: {
        paddingHorizontal: window.offset,
      },
      flex: {
        flex: 1,
      },
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
      center: {
        alignItems: 'center',
      },
      'align-start': {
        alignItems: 'flex-start',
      },
      'justify-start': {
        justifyContent: 'flex-start',
      },
      middle: {
        justifyContent: 'center',
      },
      'justify-between': {
        justifyContent: 'space-between',
      },
      'justify-end': {
        justifyContent: 'flex-end',
      },
      'align-between': {
        alignItems: 'space-between',
      },
      'w-screen': {
        width: window.width - widthPixel(40),
      },
      relative: {
        position: 'relative',
      },
      absolute: {
        position: 'absolute',
      },
      left: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
      },
      right: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      top: {
        justifyContent: 'flex-start',
      },
      bottom: {
        justifyContent: 'flex-end',
      },
      wrap: {flexWrap: 'wrap'},
      border: {
        borderWidth: 1,
        borderColor: COLORS.flueGrey,
      },
      borderBottom: {
        borderBottomWidth: 0.3,
        borderBottomColor: rgba(colors.defaultTextColor, 0.35),
      },
      'align-end': {
        alignItems: 'flex-end',
      },
      'h-half': {
        height: '50%',
      },
      'w-half': {
        width: '50%',
      },
      'h-full': {
        minHeight: '100%',
      },
      'w-full': {
        width: '100%',
      },
      'bg-transparent': {
        backgroundColor: 'transparent',
      },
      overflow: {
        overflow: 'hidden',
      },
    },
  };
  return styles;
};

export const getTextStyles = (t: 'light' | 'dark') => {
  const colors = themeColors[t || 'light'];
  const styles = {
    defaultTextColor: {
      color: COLORS.defaultTextColor,
    },
    //! Light Texts
    bigTitleLight: {
      color: COLORS.white,
      fontSize: fontPixel(32),
      fontFamily: FONTS.bold,
    },
    bigTitleDark: {
      color: COLORS.defaultTextColor,
      fontSize: fontPixel(32),
      fontFamily: FONTS.bold,
    },
    bigHeaderLight: {
      color: COLORS.white,
      fontSize: fontPixel(22),
      fontFamily: FONTS.medium,
    },
    bigHeaderDark: {
      color: COLORS.defaultTextColor,
      fontSize: fontPixel(22),
      fontFamily: FONTS.medium,
    },
    titleLight: {
      color: COLORS.white,
      fontSize: fontPixel(18),
      fontFamily: FONTS.bold,
    },
    headerLight: {
      color: COLORS.white,
      fontSize: fontPixel(18),
      fontFamily: FONTS.semiBold,
    },
    buttonTitleLight: {
      color: colors.white,
      fontSize: fontPixel(16),
      fontFamily: FONTS.semiBold,
    },
    lightButtonTitle: {
      color: rgba(colors.white, 0.9),
      fontSize: fontPixel(16),
      fontFamily: FONTS.bold,
    },
    defaultLight: {
      color: colors.white,
      fontSize: fontPixel(14),
      fontFamily: FONTS.medium,
    },
    captionLight: {
      color: colors.white,
      fontSize: fontPixel(14),
      fontFamily: FONTS.regular,
    },
    tinyLight: {
      color: rgba(colors.white, 0.48),
      fontSize: fontPixel(12),
      fontFamily: FONTS.regular,
    },
    //! Default Texts
    bigTitle: {
      color: COLORS.defaultTextColor,
      fontSize: fontPixel(32),
      fontFamily: FONTS.bold,
    },
    title: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(18),
      fontFamily: FONTS.semiBold,
    },
    titleThin: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(18),
      fontFamily: FONTS.medium,
    },
    bigSubtitle: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(22),
      fontFamily: FONTS.semiBold,
    },
    subtitle: {
      color: COLORS.defaultTextColor,
      fontSize: fontPixel(18),
      fontFamily: FONTS.semiBold,
      lineHeight: heightPixel(26),
    },
    subtitleThin: {
      color: COLORS.defaultTextColor,
      fontSize: fontPixel(18),
      fontFamily: FONTS.medium,
    },
    sectionTitleDark: {
      color: COLORS.defaultTextColor,
      fontSize: fontPixel(16),
      fontFamily: FONTS.semiBold,
    },
    buttonTitle: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(16),
      fontFamily: FONTS.semiBold,
    },
    default: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(14),
      fontFamily: FONTS.medium,
      lineHeight: heightPixel(20),
    },
    caption: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(14),
      fontFamily: FONTS.regular,
      lineHeight: heightPixel(20),
    },
    tiny: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(12),
      fontFamily: FONTS.regular,
      lineHeight: heightPixel(18),
    },
    sm: {
      color: colors.defaultTextColor,
      fontSize: fontPixel(12),
      fontFamily: FONTS.medium,
      lineHeight: heightPixel(18),
    },
    //!Warning Messages
    defaultInfo: {
      color: colors.info,
      fontSize: fontPixel(14),
      fontFamily: 'TTNormsPro-Medium',
      lineHeight: heightPixel(18),
    },
    info: {
      color: colors.info,
    },
    tinyInfo: {
      color: colors.info,
      fontSize: fontPixel(12),
      fontFamily: 'TTNormsPro-Regular',
    },
    defaultGray: {
      color: colors.gray,
      fontSize: fontPixel(14),
      fontFamily: 'TTNormsPro-Medium',
    },
    tinyGray: {
      color: colors.gray,
      fontSize: fontPixel(12),
      fontFamily: 'TTNormsPro-Regular',
      lineHeight: 18,
    },
    tinyError: {
      color: colors.error,
      fontSize: fontPixel(12),
      fontFamily: 'TTNormsPro-Medium',
    },
    //!Opacity
    opacity60: {
      color: rgba(colors.font, 0.6),
    },
    white60: {
      color: rgba(colors.white, 0.6),
    },
    opacity48: {
      color: rgba(colors.font, 0.48),
    },
    opacity40: {
      color: rgba(colors.font, 0.4),
    },

    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    input: {
      fontFamily: 'TTNormsPro-Regular',
    },
    regular: {
      fontFamily: 'TTNormsPro-Regular',
    },
    placeholder: {
      fontFamily: 'TTNormsPro-Regular',
    },
    button: {
      fontFamily: 'TTNormsPro-Regular',
    },
    primary: {
      color: colors.primary,
    },
    black: {
      color: colors.black,
    },
    secondary: {
      color: colors.secondary,
    },
    success: {
      color: colors.success,
    },
    white: {
      color: colors.white,
    },
    gray: {
      color: colors.gray,
    },
    opacityWhite: {
      color: colors.opacityWhite,
    },
    error: {
      color: colors.error,
    },
    light: {
      fontFamily: FONTS.light,
    },
    medium: {
      fontFamily: FONTS.medium,
    },
    bold: {
      fontFamily: FONTS.bold,
    },
    semibold: {
      fontFamily: FONTS.semiBold,
    },
    italic: {
      fontFamily: FONTS.italic,
    },
    textRight: {
      textAlign: 'right',
    },
    textCenter: {
      textAlign: 'center',
    },
    fontLight: {
      color: colors.fontLight,
    },
    underline: {
      textDecorationLine: 'underline',
    },
    lineThrough: {
      textDecorationLine: 'line-through',
    },
  };
  return styles;
};

const sizes = Object.freeze({...setupSizes});

const defaultTextStyles = {
  color: COLORS.defaultTextColor,
  fontFamily: 'TTNormsPro-Regular',
};

export const getStyleShortcuts = (props: UseThemeType, t?: 'light' | 'dark') => {
  let styles = {} as IStyles | StyleProp<ViewProps>;
  const {shortcutStyles, predefinedStyles} = getStyles(t || 'light');

  if (props.s) {
    props.s.split(' ').forEach(prop => {
      const customProp = prop as never;
      const customShortcut = shortcutStyles[customProp];
      if (customShortcut) {
        if (styles) styles[customShortcut] = props[customProp];
      } else {
        const customPredefinedStyles = predefinedStyles?.[customProp] as object;
        styles = {...(styles as object), ...(sizes?.[customProp] as object), ...customPredefinedStyles};
      }
    });
  }

  Object.keys(props).forEach(prop => {
    const customProp = prop as never;
    const customShortcut = shortcutStyles?.[customProp];
    if (customShortcut) {
      if (styles) styles[customShortcut] = props[customProp];
    } else {
      const customPredefinedStyles = predefinedStyles?.[customProp] as object;
      styles = {...(styles as object), ...customPredefinedStyles, ...(sizes?.[customProp] as object)};
    }
  });

  return {...(styles as object)};
};

export const getTextStyleShortcuts = (props: UseThemeType, t?: 'light' | 'dark') => {
  let styles = {} as object;

  const predefinedTextStyles = getTextStyles(t || 'light');

  if (props.s) {
    props.s.split(' ').forEach(prop => {
      const customProp = prop as never;
      const customPredefinedStyles = predefinedTextStyles?.[customProp] as object;
      styles = {...defaultTextStyles, ...styles, ...(sizes?.[customProp] as object), ...customPredefinedStyles};
    });
  }

  Object.keys(props).forEach(prop => {
    const customProp = prop as never;
    const customPredefinedTextStyles = predefinedTextStyles?.[customProp] as object;
    styles = {...defaultTextStyles, ...styles, ...customPredefinedTextStyles, ...(sizes?.[customProp] as object)};
  });

  return styles;
};
