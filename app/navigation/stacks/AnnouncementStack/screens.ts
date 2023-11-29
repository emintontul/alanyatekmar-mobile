import {AnnouncementStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';
import AnnouncementDetail from '@/screens/AnnouncementDetail';
import AnnouncementList from '@/screens/AnnouncementList';

const Screens: Array<IScreen<AnnouncementStackNavigationProps>> = [
  {
    title: 'bottom_tab.Announcement_list',
    name: routes.ANNOUNCEMENT_LIST,
    component: AnnouncementList,
    headerShown: true,
  },
  {
    title: 'bottom_tab.Announcement_detail',
    name: routes.ANNOUNCEMENT_DETAIL,
    component: AnnouncementDetail,
    headerShown: true,
  },
];

export default Screens;
