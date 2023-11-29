import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type AdminNotificationStackNavigationProps = {
  [Routes.ADMIN_NOTIFICATION]: undefined;
};

export type AdminNotificationStackNavigationType = StackNavigationProp<AdminNotificationStackNavigationProps>;

export type AdminNotificationStackNavigationRouteType<TPageName extends Keyof<AdminNotificationStackNavigationProps>> = RouteProp<AdminNotificationStackNavigationProps, TPageName>;
