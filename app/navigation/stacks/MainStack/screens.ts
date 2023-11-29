import { AdminBottomTabNavigation } from '@/navigation/admin-bottom-tab/BottomTabNavigation';
import {BottomTabNavigation} from '../../bottom-tab/BottomTabNavigation';
import Routes from '../../Routes';
import AuthStack from '../AuthStack';
import ExerciseStack from '../ExerciseStack';
import PaymentStack from '../PaymentStack';
import SmeStack from '../SmeStack';

import {RequestDetail, SplashScreen} from '@/screens';

const Screens = [
  {
    name: Routes.SPLASH_SCREEN,
    component: SplashScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routes.AUTH_ROOT,
    component: AuthStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routes.EXERCISE_ROOT,
    component: ExerciseStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routes.MAIN_TABS_ROOT,
    component: BottomTabNavigation,
    options: {
      headerShown: false,
    },
  },

  {
    name: Routes.ADMIN_TABS_ROOT,
    component: AdminBottomTabNavigation,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routes.SME_INVOICES,
    component: SmeStack,
    options: {
      headerShown: false,
    },
  },
  {
    name: Routes.REQUEST_DETAIL,
    component: RequestDetail,
    options: {
      headerShown: true,
    },
  },
  {
    name: Routes.PAYMENT_MAIN,
    component: PaymentStack,
    options: {
      headerShown: false,
    },
  },
];

export default Screens;
