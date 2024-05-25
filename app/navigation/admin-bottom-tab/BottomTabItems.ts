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
import {BottomStackNavigationProps} from '../bottom-tab/BottomTabItems';
import AdminStack from '../stacks/AdminStack';
import AdminNotificationStack from '../stacks/AdminNotificationStack';

export type AdminBottomStackNavigationProps = {
  [Routes.HOME_MAIN]: undefined;
  [Routes.INVOICES_MAIN]: undefined;
  [Routes.PHOTOS_MAIN]: undefined;
  [Routes.EXERCISE_MAIN]: undefined;
  [Routes.REQUESTS_MAIN]: undefined;
  [Routes.PROFILE_MAIN]: undefined;
  [Routes.ANNOUNCEMENT_MAIN]: undefined;
};

export type BottomStackNavigationPropsType = StackNavigationProp<BottomStackNavigationProps>;
export type BottomStackNavigationRouteType<TPageName extends Keyof<BottomStackNavigationProps>> = RouteProp<BottomStackNavigationProps, TPageName>;

export const AdminBottomTabItemList: IScreen<BottomStackNavigationProps>[] = [
  {
    label: 'bottom_tab.homepage',
    icon: ICONS.homeFilled,
    name: Routes.ADMIN_HOME,
    component: AdminStack,
    headerShown: false,
  },
  {
    label: 'common.notifications',
    icon: ICONS.Notification2,
    name: Routes.ADMIN_NOTIFICATION_SEND,
    component: AdminNotificationStack,
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
