import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type ProfileStackNavigationProps = {
  [Routes.PROFILE]: undefined;
};

export type ProfileStackNavigationType = StackNavigationProp<ProfileStackNavigationProps>;

export type ProfileStackNavigationRouteType<TPageName extends Keyof<ProfileStackNavigationProps>> = RouteProp<ProfileStackNavigationProps, TPageName>;
