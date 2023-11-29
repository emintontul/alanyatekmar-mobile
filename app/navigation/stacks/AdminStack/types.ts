import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type AdminStackNavigationProps = {
  [Routes.ADMIN]: undefined;
  [Routes.ADMIN_HOME]: undefined;
  [Routes.ADMIN_USER_PHOTOS]: undefined;
  [Routes.ADMIN_ADD_USER_PHOTO]: undefined;
  [Routes.ADMIN_USER_SURVEY]: undefined;
  [Routes.ADMIN_USER_INFORMATIONS]: undefined;
};

export type AdminStackNavigationType = StackNavigationProp<AdminStackNavigationProps>;

export type AdminStackNavigationRouteType<TPageName extends Keyof<AdminStackNavigationProps>> = RouteProp<AdminStackNavigationProps, TPageName>;
