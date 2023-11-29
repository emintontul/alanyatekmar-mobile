import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const platform = Platform.OS;

//#region theme colors
export const themeColors = {
  light: {
    //#region Backgrounds colors
    primaryDark: '#130F26',
    lightGrey: '#E7E9EC',
    cardBg: '#fff',
    success: '#58BC8C',
    successLight: '#E1F3EA',
    successGreen: '#58BC8C',
    flueGrey: '#F3F5F7',
    //#endregion

    // default font color
    font: '#423F51', //%100
    fontLight: '#423f5199', //%60
    fontLighter: '#423f5166', //%40
    headerBackgroundColor: '#130F26',
    headerColor: '#FFFFFF',
    screenBgColor: '#FFFFFF',
    bgGray: '#F5F6FA',
    bgWhite: '#FFFFFF',

    defaultTextColor: '#423F51',
    inputBg: '#FFFFFF',
    inputText: '#423F51',
    bottomTabColor: '#FFFFFF',
    tabItem: '#423f513d',
    tabItemFocused: '#0193D7',

    // base colors
    primary: '#0193D7',
    primaryLight: '#5688f3',
    primaryLighter: '#6d98f5',
    primaryLightOpacity: '#6D98F529', // 16%
    secondary: '#044571',
    tertiary: '#FFE358',

    // color variations
    warning: '#F6C479',
    warningLight: '#FEF7EC',
    infoLight: '#e0eaff',
    info: '#6D98F5',
    error: '#FF8B8B',
    errorLight: '#FFE7E7',
    gray: '#94A3B8',
    lightGray: '#AAB2BA',
    lightGrayOpacity: '#423F5114', // 8%
    yellow: '#FADDB3',
    lightBlue: '#F1F5F9',
    stroke: '#DFE2E9',
    stroke60: '#E1E6EFB2',
    opacityWhite: '#ffffff3d',
    figo: '#ff595a',

    // radio button
    radioButtonBorder: '#94A3B8',
    radioButtonChecked: '#0193D7',

    // non-colors
    black: '#000000',
    white: '#FFFFFF',

    // segment control
    segmentBar: '#F2F5F6',
    activeSegment: '#fff',

    //ios statusbar color
    statusbarDark: 'light-content',
    statusbarLight: 'dark-content',

    // app colors
    selectedCheckboxBackground: '#48586E',
    unselectedCheckboxBorder: '#D4D4D4',
    placeholder: '#7E7E7E',
  },
  dark: {
    //#region Backgrounds colors
    backgroundPrimary: '#212121',
    cardBg: '#303030',
    //#endregion
    opacityWhite: '#303030',
    success: '#303030',

    inputBg: '#212121',
    inputText: '#fff',
    bottomTabColor: '#303030',
    tabItem: '#000',
    tabItemFocused: '#fff',
    defaultTextColor: 'white',

    // default font color
    font: '#000000',
    fontLight: '#423f5199', //%60
    fontLighter: '#423f5166', //%40
    screenBgColor: '#121212',
    headerBackgroundColor: '#212121',
    headerColor: '#dedede',
    bgGray: '#F5F6FA',

    // base colors
    primary: '#212121',
    primaryLight: '#5688f3',
    primaryLighter: '#6d98f5',
    secondary: '#403E3F',
    tertiary: '#FFE358',
    primaryLightOpacity: '#6D98F529', // 16%

    // non-colors
    black: '#fff',
    white: '#FFFFFF',

    // radio button
    radioButtonBorder: '#fff',
    radioButtonChecked: '#fff',

    // segment control
    segmentBar: '#212121',
    activeSegment: '#535453',

    // color variations
    yellow: '#FADDB3',
    gray: '#535453',
    lightGray: '#EFF1F3',
    lightGrayOpacity: '#423F5114', // 8%
    error: '#DC3545',
    errorLight: '#FFE7E7',
    errorBg: '#f9d7da',
    warning: '#FFE358',
    warningLight: '#FEF7EC',
    successBg: '#d4edda',
    successText: '#155624',
    info: '#4DA1FF',
    infoLight: '#e0eaff',
    primaryLightBg: '#feedb9',
    primaryDark: '#cd9b04',
    figo: '#ff595a',

    //ios statusbar color
    statusbarDark: 'light-content',
    statusbarLight: 'dark-content',

    // app colors
    selectedCheckboxBackground: '#48586E',
    unselectedCheckboxBorder: '#D4D4D4',
    placeholder: '#7E7E7E',
  },
};
//#endregion theme colors

export const COLORS = {
  ...themeColors.light,
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 16,
  radius: 8,
  padding: 16,
  radiusBtn: 8,

  inputHeight: 45,
  iconSize: 24,

  // font sizes
  h1: platform === 'android' ? 35 : 34,
  h2: 24,
  h3: 20,
  title: 18,
  subtitle: 14,
  caption: 12,
  medium: 16,
  small: 10,
  extraSmall: 4,

  inputText: 15,
  inputLabel: 14,
  inputError: 13,
  // app dimensions
  width,
  height,

  // header
  header: 50,
  subheader: 30,

  // bottom tab
  tabText: width * 0.035,
  tabIcon: width * 0.04,
  bottomTabHeight: 60,

  // product detail header
  headerIconSize: 24,

  // buttonHeight
  buttonHeight: 45,

  starSize: width * 0.045,

  shadow: {
    shadowColor: 'rgba(0,0,0,0.075)',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    borderTopLeftRadius: 40,
  },
};

export const FONTS = {
  regular: 'TTNormsPro-Regular',
  italic: 'TTNormsPro-Italic',
  black: 'TTNormsPro-Black',
  bold: 'TTNormsPro-Bold',
  extraBold: 'TTNormsPro-ExtraBold',
  medium: 'TTNormsPro-Medium',
  thin: 'TTNormsPro-Thin',
  light: 'TTNormsPro-Light',
  fontFamily: 'TTNormsPro-Regular',
  h1: {
    fontSize: SIZES.h1,
    fontFamily: 'TTNormsPro-Regular',
    letterSpacing: 0.15,
  },
  h2: {
    fontSize: SIZES.h2,
    fontFamily: 'TTNormsPro-Regular',
    letterSpacing: 0,
  },
  h3: {
    fontSize: SIZES.h3,
    fontFamily: 'TTNormsPro-Regular',
    letterSpacing: 0.15,
  },
  title: {
    fontSize: SIZES.title,
    fontFamily: 'TTNormsPro-Regular',
    letterSpacing: 0.15,
  },
  subtitle: {
    fontSize: SIZES.subtitle,
    fontFamily: 'TTNormsPro-Regular',
  },
  caption: {
    fontSize: SIZES.caption,
    fontFamily: 'TTNormsPro-Regular',
    letterSpacing: 0.4,
  },
  small: {
    fontSize: SIZES.small,
    fontFamily: 'TTNormsPro-Regular',
    letterSpacing: 1.5,
  },
  input: {
    fontFamily: 'TTNormsPro-Regular',
  },
  placeholder: {
    fontFamily: 'TTNormsPro-Regular',
  },
  button: {
    fontFamily: 'TTNormsPro-Regular',
  },
};

export const window = {
  offset: 20,
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
  designHeight: 812,
  designWidth: 375,
};

export const fontSize = [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

export const padding = [5, 10, 15, 20, 25, 30, 35, 40, 45];

export const bottomTabHeight = window.height < 680 ? 50 : 75;

export const fingerSize = 40;
