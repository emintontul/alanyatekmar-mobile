import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {SME_INVOICES_NESTED_SCREENS} from '../SmeStack/types';

import Routes from '@/navigation/Routes';
import {DialogProps, Keyof} from '@/utils';

export type MainStackNavigationProps = {
  [Routes.SPLASH_SCREEN]: undefined;
  [Routes.MAIN_TABS_ROOT]: undefined;
  [Routes.ADMIN_TABS_ROOT]: undefined;
  [Routes.AUTH_ROOT]: undefined;
  [Routes.SME_INVOICES]:
    | {
        screen?: SME_INVOICES_NESTED_SCREENS;
        params?: {
          initialPage?: number;
        };
      }
    | undefined;
  [Routes.ALERT]: DialogProps;
  [Routes.REQUEST_DETAIL]: {requestNo: string; status: number};
  [Routes.PAYMENT_MAIN]: undefined;
};

export type MainStackNavigationPropsType = StackNavigationProp<MainStackNavigationProps>;

export type MainStackNavigationRouteType<TPageName extends Keyof<MainStackNavigationProps>> = RouteProp<MainStackNavigationProps, TPageName>;
