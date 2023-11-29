import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type PhotoStackNavigationProps = {
  [Routes.PHOTO_LIST]: undefined;
};

export type PhotoStackNavigationPropsType = StackNavigationProp<PhotoStackNavigationProps>;

export type PhotoStackNavigationRouteType<TPageName extends Keyof<PhotoStackNavigationProps>> = RouteProp<PhotoStackNavigationProps, TPageName>;
