import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export interface CardStyle {
  late: ReturnType;
  today: ReturnType;
  normal: ReturnType;
}

export interface ReturnType {
  text: TextStyle;
  bg: ViewStyle | TextStyle | ImageStyle;
  icon: TextStyle;
}

export interface IPayment {
  remainingDays: number;
  isToday?: boolean;
  amount: string;
  code: string;
  title: string;
}

export interface IUpcomingPayment {
  date: string;
  payments: Array<IPayment>;
}
