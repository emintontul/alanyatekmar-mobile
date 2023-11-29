import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type PaymentStackNavigationProps = {
  navigate(arg0: string): void;
  [Routes.PAYMENT_MAIN]: undefined;
};

export type PaymentStackNavigationType = StackNavigationProp<PaymentStackNavigationProps>;

export type PaymentStackNavigationRouteType<TPageName extends Keyof<PaymentStackNavigationProps>> = RouteProp<PaymentStackNavigationProps, TPageName>;
