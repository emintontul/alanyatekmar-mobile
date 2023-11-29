import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';
import UserList from '@/screens/Admin/UserList';
import { AdminNotificationStackNavigationProps } from './types';
import { ExerciseList } from '@/screens';
import UserPhotoList from '@/screens/Admin/UserPhotoList';
import AddUserPhoto from '@/screens/Admin/AddUserPhoto';
import UserSurvey from '@/screens/Admin/UserSurvey';
import UserInformations from '@/screens/Admin/UserInformation';
import AdminNotification from '@/screens/Admin/Notification';

const Screens: Array<IScreen<AdminNotificationStackNavigationProps>> = [

  {
    title: 'admin_bottom_tab.admin_notification',
    name: routes.ADMIN_NOTIFICATION,
    component: AdminNotification,
    headerShown: true,
  },
];

export default Screens;
