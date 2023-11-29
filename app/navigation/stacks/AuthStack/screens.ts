import {AuthStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {ForgotPassword, LoginScreen, RegisterScreen, ResetPassword} from '@/screens';

const Screens: Array<IScreen<AuthStackNavigationProps>> = [
  {
    title: 'Login',
    name: routes.LOGIN_SCREEN,
    component: LoginScreen,
    headerShown: false,
  },
  {
    title: 'Register',
    name: routes.REGISTER_SCREEN,
    component: RegisterScreen,
    headerShown: true,
  },
  {
    title: '',
    name: routes.FORGOT_PASSWORD,
    component: ForgotPassword,
    headerShown: true,
  },
  {
    title: 'Reset',
    name: routes.RESET_PASSWORD,
    component: ResetPassword,
    headerShown: true,
  },
];

export default Screens;
