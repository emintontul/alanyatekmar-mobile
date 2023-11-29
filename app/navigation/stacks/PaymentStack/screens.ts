import {PaymentStackNavigationProps} from './types';
import routes from '../../Routes';
import {IScreen} from '../Models/IScreen';

import {Payment} from '@/screens';

const Screens: Array<IScreen<PaymentStackNavigationProps>> = [
  {
    title: 'bottom_tab.profile',
    name: routes.PAYMENT_MAIN,
    component: Payment,
    headerShown: true,
  },
];

export default Screens;
