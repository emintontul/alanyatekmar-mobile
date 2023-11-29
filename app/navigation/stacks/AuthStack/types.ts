import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type AuthStackNavigationProps = {
  [Routes.AUTH_ROOT]: undefined;
  [Routes.LOGIN_SCREEN]: undefined;
  [Routes.REGISTER_SCREEN]: undefined;
  [Routes.FORGOT_PASSWORD]: undefined;
  [Routes.RESET_PASSWORD]: undefined;
};

export type AuthStackNavigationPropsType = StackNavigationProp<AuthStackNavigationProps>;

export type AuthStackNavigationRouteType<TPageName extends Keyof<AuthStackNavigationProps>> = RouteProp<AuthStackNavigationProps, TPageName>;
