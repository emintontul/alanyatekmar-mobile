import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type HomeStackNavigationProps = {
  [Routes.HOME_SCREEN]: undefined;
  [Routes.UPCOMING_PAYMENTS]: undefined;
  [Routes.PHOTOS]: undefined;
  [Routes.DASHBOARD_REQUEST_DETAIL_SCREEN]: undefined;
};

export type HomeStackNavigationPropsType = StackNavigationProp<HomeStackNavigationProps>;

export type HomeStackNavigationRouteType<TPageName extends Keyof<HomeStackNavigationProps>> = RouteProp<HomeStackNavigationProps, TPageName>;
