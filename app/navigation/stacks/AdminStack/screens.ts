import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';
import UserList from '@/screens/Admin/UserList';
import {AdminStackNavigationProps} from './types';
import {ExerciseList} from '@/screens';
import UserPhotoList from '@/screens/Admin/UserPhotoList';
import AddUserPhoto from '@/screens/Admin/AddUserPhoto';
import UserSurvey from '@/screens/Admin/UserSurvey';
import UserInformations from '@/screens/Admin/UserInformation';
import AdminNotification from '@/screens/Admin/Notification';

const Screens: Array<IScreen<AdminStackNavigationProps>> = [
  {
    title: 'admin_bottom_tab.admin_home',
    name: routes.ADMIN_ROOT,
    component: UserList,
    headerShown: true,
  },

  {
    title: 'admin_bottom_tab.admin_user_photo_list',
    name: routes.ADMIN_USER_PHOTOS,
    component: UserPhotoList,
    headerShown: true,
  },
  {
    title: 'admin_bottom_tab.admin_add_user_photo',
    name: routes.ADMIN_ADD_USER_PHOTO,
    component: AddUserPhoto,
    headerShown: true,
  },
  {
    title: 'admin_bottom_tab.admin_user_survey',
    name: routes.ADMIN_USER_SURVEY,
    component: UserSurvey,
    headerShown: true,
  },

  {
    title: 'admin_bottom_tab.admin_user_informations',
    name: routes.ADMIN_USER_INFORMATIONS,
    component: UserInformations,
    headerShown: true,
  },
];

export default Screens;
