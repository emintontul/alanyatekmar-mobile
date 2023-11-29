import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import Routes from '@/navigation/Routes';
import {Keyof} from '@/utils';

export type AnnouncementStackNavigationProps = {
  [Routes.ANNOUNCEMENT_DETAIL]: undefined;
  [Routes.ANNOUNCEMENT_LIST]: undefined;
};

export type AnnouncementStackNavigationPropsType = StackNavigationProp<AnnouncementStackNavigationProps>;

export type AnnouncementStackNavigationRouteType<TPageName extends Keyof<AnnouncementStackNavigationProps>> = RouteProp<AnnouncementStackNavigationProps, TPageName>;
