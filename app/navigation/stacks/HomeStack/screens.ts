import {HomeStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {AddTourReservation, ConnectPrinter, Documents, ExerciseDetail, HomePage, UpcomingPayments} from '@/screens';
import DashboardRequestDetail from '@/screens/DashboardRequestDetail';
import NotificationList from '@/screens/NotificationList';

const Screens: Array<IScreen<HomeStackNavigationProps>> = [
  {
    title: 'Home',
    name: routes.HOME_SCREEN,
    component: HomePage,
    headerShown: true,
  },
  {
    title: 'notificationList',
    name: routes.NOTIFICATION_LIST,
    component: NotificationList,
    headerShown: true,
  },
  {
    title: 'connect_printer',
    name: routes.CONNECT_PRINTER,
    component: ConnectPrinter,
    headerShown: true,
  },
  {
    title: 'add_tour_reservation',
    name: routes.ADD_TOUR_RESERVATION,
    component: AddTourReservation,
    headerShown: true,
  }
];

export default Screens;
