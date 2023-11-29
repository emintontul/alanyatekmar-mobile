import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ICONS} from '../../utils/icon-enums';
import Routes from '../Routes';
import PhotoStack from '../stacks/PhotoStack';
import HomeStack from '../stacks/HomeStack';
import InvoiceStack from '../stacks/InvoiceStack';
import {IScreen} from '../stacks/Models/IScreen';
import ProfiletStack from '../stacks/ProfileStack';
import {Keyof} from '@/utils';
import AnnouncementStack from '../stacks/AnnouncementStack';

export type BottomStackNavigationProps = {
  [Routes.HOME_MAIN]: undefined;
  [Routes.INVOICES_MAIN]: undefined;
  [Routes.PHOTOS_MAIN]: undefined;
  [Routes.EXERCISE_MAIN]: undefined;
  [Routes.REQUESTS_MAIN]: undefined;
  [Routes.PROFILE_MAIN]: undefined;
  [Routes.ANNOUNCEMENT_MAIN]: undefined;
  [Routes.ADMIN_HOME]: undefined;
  [Routes.ADMIN_NOTIFICATION]: undefined;
};

export type BottomStackNavigationPropsType = StackNavigationProp<BottomStackNavigationProps>;
export type BottomStackNavigationRouteType<TPageName extends Keyof<BottomStackNavigationProps>> = RouteProp<BottomStackNavigationProps, TPageName>;

export const BottomTabItemList: IScreen<BottomStackNavigationProps>[] = [
  {
    label: 'bottom_tab.homepage',
    icon: ICONS.homeFilled,
    name: Routes.HOME_MAIN,
    component: HomeStack,
    headerShown: false,
  },
  {
    label: 'bottom_tab.exercises',
    icon: ICONS.kettlebell,
    name: Routes.INVOICES_MAIN,
    component: InvoiceStack,
    headerShown: false,
  },
  {
    label: 'bottom_tab.photos',
    icon: ICONS.collections,
    name: Routes.PHOTOS_MAIN,
    component: PhotoStack,
    headerShown: false,
  },
  {
    label: 'bottom_tab.announcements',
    icon: ICONS.insertDriveFile,
    name: Routes.ANNOUNCEMENT_MAIN,
    component: AnnouncementStack,
    headerShown: false,
  },
  {
    label: 'bottom_tab.profile',
    icon: ICONS.person,
    name: Routes.PROFILE_MAIN,
    component: ProfiletStack,
    headerShown: false,
  },
];
