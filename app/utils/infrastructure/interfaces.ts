import {StyleProp, ViewStyle} from 'react-native';

export interface IThemeImageObject {
  [image: string]: string | number;
}

export interface IStyleShortcuts {
  overflow?: boolean;
  w?: number | string;
  h?: number | string;
  mx?: number;
  my?: number;
  mr?: number;
  ml?: number;
  mt?: number;
  mb?: number;
  px?: number;
  py?: number;
  p?: number;
  pl?: number;
  pb?: number;
  pt?: number;
  pr?: number;
  bg?: number;
  fs?: number;
  bw?: number;
  align?: string;
  justify?: string;
  direction?: string;
  backgroundColor?: string;
  borderBottom?: boolean | number;
  flex?: number | boolean;
  border?: number | boolean;
  radius?: number;
  borderRadius?: number;
  color?: string;
  s?: string;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  wrap?: boolean;
  sm?: boolean;
  middle?: boolean;
  absolute?: boolean;
  relative?: boolean;
}

export interface ITextStyles {
  fullWidth?: boolean;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  header?: boolean;
  subheader?: boolean;
  title?: boolean;
  titleLight?: boolean;
  subtitle?: boolean;
  caption?: boolean;
  small?: boolean;
  input?: boolean;
  placeholder?: boolean;
  button?: boolean;
  primary?: boolean;
  black?: boolean;
  secondary?: boolean;
  success?: boolean;
  white?: boolean;
  error?: boolean;
  opacityWhite?: boolean;
  semibold?: boolean;
  light?: boolean;
  medium?: boolean;
  bold?: boolean;
  italic?: boolean;
  cardTitle?: boolean;
  defaultTextColor?: boolean;
  bigTitle?: boolean;
  fullHeight?: boolean;
  opacity?: boolean;
  opacity40?: boolean;
  opacity60?: boolean;
  lightButtonTitle?: boolean;
  defaultLight?: boolean;
  captionLight?: boolean;
  tinyLight?: boolean;
  titleThin?: boolean;
  buttonTitle?: boolean;
  tiny?: boolean;
  default?: boolean;
  headerLight?: boolean;
  defaultInfo?: boolean;
  tinyInfo?: boolean;
  defaultGray?: boolean;
  tinyGray?: boolean;
  gray?: boolean;
  textRight?: boolean;
  bigSubtitle?: boolean;
  buttonTitleLight?: boolean;
  bigHeaderLight?: boolean;
  bigHeaderDark?: boolean;
  sectionTitleDark?: boolean;
  subtitleThin?: boolean;
  bigTitleLight?: boolean;
  bigTitleDark?: boolean;
  tinyError?: boolean;
  regular?: boolean;
  textCenter?: boolean;
  fontLight?: boolean;
  info?: boolean;
  font?: boolean; // ?
  underline?: boolean;
  lineThrough?: boolean;
  white60?: boolean;
}

export interface IPredefinedStyles {
  'bg-primary': StyleProp<ViewStyle>;
  'bg-card': StyleProp<ViewStyle>;
  'bg-white': StyleProp<ViewStyle>;
  'bg-primary-light': StyleProp<ViewStyle>;
  'bg-gray': StyleProp<ViewStyle>;
  px: StyleProp<ViewStyle>;
  block: StyleProp<ViewStyle>;
  flex: StyleProp<ViewStyle>;
  row: StyleProp<ViewStyle>;
  column: StyleProp<ViewStyle>;
  center: StyleProp<ViewStyle>;
  middle: StyleProp<ViewStyle>;
  'justify-between': StyleProp<ViewStyle>;
  'align-between': StyleProp<ViewStyle>;
  left: StyleProp<ViewStyle>;
  right: StyleProp<ViewStyle>;
  top: StyleProp<ViewStyle>;
  bottom: StyleProp<ViewStyle>;
  wrap: StyleProp<ViewStyle>;
  border: StyleProp<ViewStyle>;
  borderBottom: StyleProp<ViewStyle>;
  primaryLight: StyleProp<ViewStyle>;
}

export interface IStyles {
  shortcutStyles: IStyleShortcuts;
  predefinedStyles: IPredefinedStyles;
}

export interface DialogAction {
  text: string;
  onPress?: (_promptText?: string | null) => void;
  style: 'cancel' | 'default' | 'confirm';
}

export interface DialogOption {
  cancelable: boolean;
  backgroundClose: boolean;
}

export interface DialogProps {
  type: 'success' | 'warning' | 'error' | 'request_success' | 'payment_success' | 'calendar_warning';
  position: 'top' | 'bottom' | 'left' | 'right';
  placeholder?: string;
  title: string;
  message: string;
  option?: DialogOption;
  alertType?: 'confirm' | 'alert' | 'prompt';
  action?: Array<DialogAction>;
}
